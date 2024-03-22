import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import Portal from '../portal/Portal'

export type ModalProps = {
  title: string
  children: ReactNode
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const Modal = ({
  children,
  open,
  onCancel,
  onConfirm,
  title,
}: ModalProps) => {
  return (
    <Portal>
      <dialog
        open={open}
        className="open:flex open:z-50 open:items-center open:justify-center open:bg-gray-100/75 open:fade open:fixed open:top-0 open:left-0 open:w-full open:h-full open:outline-none open:overflow-x-hidden open:overflow-y-auto"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-1/2 pointer-events-none">
          <div className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalScrollableLabel"
              >
                {title}
              </h5>

              <XMarkIcon
                className="w-6 h-6 p-1 cursor-pointer"
                onClick={() => {
                  onCancel()
                }}
              />
            </div>
            <div className="modal-body relative p-4">{children}</div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => {
                  onCancel()
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm()
                }}
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </Portal>
  )
}
