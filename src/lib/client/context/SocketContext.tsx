import { useAuthorizer } from '@authorizerdev/authorizer-react'
import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { Socket } from 'socket.io-client/build/esm/socket'
import { SocketEvents } from '../../shared/shared.model'
import { ChatUser } from '../models/chat.model'

export const initSockets = async () => {
  await fetch('/api/socket')
}

type SocketContextProps = {
  socket: null | Socket
  loggedUser: null | ChatUser
  socketId: string
}
export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  loggedUser: null,
  socketId: '',
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket>()
  const loggedUser = useRef<ChatUser | null>(null)
  const { user } = useAuthorizer()
  const [socketId, setSocketId] = useState<string>('')

  useEffect(() => {
    initSockets().then()
  }, [])

  useEffect(() => {
    if (!user?.email) {
      return
    }

    socketRef.current = io()
    loggedUser.current = {
      ...user,
    }

    socketRef.current.on(SocketEvents.connected, (id: string) => {
      loggedUser.current = {
        ...user,
        socketId: id,
      }
      setSocketId(id)
    })

    return () => {
      socketRef.current?.close()
    }
  }, [user?.email])

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current || null,
        loggedUser: loggedUser.current,
        socketId: socketId,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
export default SocketProvider
