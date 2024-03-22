import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'
import { EventCreateRoom } from '../../lib/shared/shared.model'

interface ChatRoomsProps {
  roomsList: EventCreateRoom[]
  onClickRoom: (_: string) => void
  toRead: string[]
}

export const ChatRooms = ({
  roomsList,
  onClickRoom,
  toRead,
}: ChatRoomsProps) => {
  return (
    <>
      <div className="text-lg bg-blue-500 text-white p-2 font-medium">
        Chats
      </div>
      <div className="overflow-y-auto">
        <ul>
          {roomsList.map(({ roomName, isPrivate }) => (
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer"
              key={roomName}
              onClick={() => {
                onClickRoom(roomName)
              }}
            >
              <span className="inline-flex items-center">
                {isPrivate ? (
                  <LockClosedIcon className="w-4 h-4 mr-2" />
                ) : (
                  <LockOpenIcon className="w-4 h-4 mr-2" />
                )}
                {toRead.includes(roomName) ? (
                  <strong>{roomName}</strong>
                ) : (
                  <p>{roomName}</p>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
