import { ChatUser } from '../../client/models/chat.model'
import { StoreSessions } from './serverStore'

export type SessionsHelpers = {
  addSession: (key: string, user: ChatUser) => void
  deleteSession: (key: string) => void
  getAllUsersEmails: () => string[]
  getChatUsers: () => ChatUser[]
  getSession: (key: string) => ChatUser | undefined
}

export const storeSessionsHelpers = (
  sessionStore: StoreSessions
): SessionsHelpers => {
  const addSession = (key: string, user: ChatUser) => {
    sessionStore.set(key, user)
  }

  const deleteSession = (key: string) => {
    sessionStore.delete(key)
  }

  const getAllUsersEmails = () => {
    return Array.from(sessionStore.values()).map(({ email }) => email)
  }

  const getChatUsers = () => {
    return Array.from(sessionStore.values())
  }

  const getSession = (key: string) => {
    return sessionStore.get(key)
  }

  return {
    addSession,
    deleteSession,
    getAllUsersEmails,
    getChatUsers,
    getSession,
  }
}
