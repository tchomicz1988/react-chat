import { ChatUser } from '../../lib/client/models/chat.model'

interface ChatUsersProps {
  users: ChatUser[]
  toRead: string[]
  loggedUser?: ChatUser | null
  onClickUser: (_: ChatUser) => void
}

export const ChatUsers = ({
  users,
  loggedUser,
  onClickUser,
  toRead,
}: ChatUsersProps) => {
  return (
    <>
      <div className="text-lg bg-orange-400 text-white p-2 font-medium">
        Users
      </div>
      <div className="overflow-y-auto">
        <ul>
          {users?.map((user: ChatUser) => (
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer"
              key={user.socketId}
              onClick={() => {
                onClickUser(user)
              }}
            >
              {toRead.includes(user.email) ? (
                <strong>
                  {user.email}
                  {loggedUser?.email === user.email && '(you)'}
                </strong>
              ) : (
                <p>
                  {user.email} {loggedUser?.email === user.email && '(you)'}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
