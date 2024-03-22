import { ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { randomId } from '../../lib/client/utils/utils'

type PortalProps = {
  children: ReactNode
  wrapperId?: string
}

function Portal({ children, wrapperId }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement>()

  useLayoutEffect(() => {
    if (!wrapperId) {
      wrapperId = randomId()
    }

    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    setWrapperElement(wrapperElement)

    return () => {
      if (wrapperElement.parentNode) {
        wrapperElement.parentNode.removeChild(wrapperElement)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return createPortal(children, wrapperElement)
}
export default Portal
