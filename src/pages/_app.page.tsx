import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthorizerProvider } from '@authorizerdev/authorizer-react'
import RouteGuardContext from '../lib/client/context/RouteGuardContext'

import { authorizerConfig } from '../config/authorizer.config'
import { Provider as StoreProvider } from 'react-redux'
import SocketProvider from '../lib/client/context/SocketContext'
import { store } from '../lib/client/stores/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthorizerProvider config={authorizerConfig}>
      <RouteGuardContext>
        <SocketProvider>
          <StoreProvider store={store}>
            <Component {...pageProps} />
          </StoreProvider>
        </SocketProvider>
      </RouteGuardContext>
    </AuthorizerProvider>
  )
}

export default MyApp
