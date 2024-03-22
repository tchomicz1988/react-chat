import Head from 'next/head'
import { ReactNode, useContext } from 'react'
import { RouterGuardContext } from '../../lib/client/context/RouteGuardContext'
import { NavBar } from '../navbar/NavBar'
import { LayoutLoader } from './LayoutLoader'

const Layout = ({ children }: { children: ReactNode }) => {
  const { loading } = useContext(RouterGuardContext)

  return (
    <div className="h-screen overflow-y-auto">
      <Head>
        <title>Chat App</title>
        <meta name="description" content="A simple chat application" />
      </Head>
      {loading ? (
        <LayoutLoader />
      ) : (
        <>
          <NavBar />
          {children}
        </>
      )}
    </div>
  )
}

export default Layout
