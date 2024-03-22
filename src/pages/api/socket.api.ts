import { NextApiRequest, NextApiResponse } from 'next'
import { Socket as SocketNet } from 'net'
import { Socket } from 'socket.io'
import { Server as SocketIOServer, ServerOptions } from 'socket.io'

import { SocketEvents } from '../../lib/shared/shared.model'
import { roomsHandler } from '../../lib/server/utils/roomsHandler'
import { ServerStore, serverStore } from '../../lib/server/stores/serverStore'
import { sessionHandler } from '../../lib/server/utils/sesionsHandler'

let io: SocketIOServer
let store: ServerStore

type NextApiResponseServerIO = NextApiResponse & {
  socket: SocketNet & {
    server: ServerOptions & {
      io: SocketIOServer
      store: ServerStore
    }
  }
}

const socketApi = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    io = new SocketIOServer(res.socket.server)
    store = serverStore()
    res.socket.server.io = io
    res.socket.server.store = store

    io.on(SocketEvents.connection, (socket: Socket) => {
      const { onCreateSession, onDisconnect } = sessionHandler(io, store)
      const { onSendMessage, onJoinToRoom, onCreateRoom } = roomsHandler(
        io,
        store
      )

      socket.on(SocketEvents.createSession, onCreateSession)

      socket.on(SocketEvents.disconnect, onDisconnect)

      socket.on(SocketEvents.sendMessage, onSendMessage)

      socket.on(SocketEvents.joinToRoom, onJoinToRoom)

      socket.on(SocketEvents.createRoom, onCreateRoom)

      socket.emit(SocketEvents.connected, socket.id)
    })
  }
  res.end()
}

export default socketApi
