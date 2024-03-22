import { Modal, ModalProps } from '../modal/Modal'

interface ChatConfirmJoin extends Partial<ModalProps> {
  roomName: string
  userEmail?: string
}

const ChatConfirmJoin = ({
  open = false,
  roomName,
  userEmail,
  onConfirm,
  onCancel = () => '',
}: ChatConfirmJoin) => {
  const handleConfirm = () => {
    if (!userEmail) {
      return
    }
    onConfirm && onConfirm()
    onCancel()
  }

  return (
    <Modal
      open={open}
      onConfirm={handleConfirm}
      title="Join"
      onCancel={onCancel}
    >
      <p>Do you want to join the room: {roomName}</p>
    </Modal>
  )
}
export default ChatConfirmJoin
