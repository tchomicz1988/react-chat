import { useAuthorizer } from '@authorizerdev/authorizer-react'
import Link from 'next/link'
import { routerConfig } from '../../config/rooter.config'

export const NavBar = () => {
  const { user, setUser, setToken, logout } = useAuthorizer()
  const onLogout = async () => {
    setUser(null)
    setToken(null)
    await logout()
  }
  return (
    <nav className="flex justify-between items-center w-full px-10 py-8 border-b">
      <div>
        <Link href={routerConfig.home.path}>
          <a>
            <h1>Home</h1>
          </a>
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <Link href={routerConfig.chat.path}>
              <a className="text-blue-500 hover:text-blue-400 mr-10">Chat</a>
            </Link>
            <button
              className="text-blue-500 hover:text-blue-400"
              onClick={onLogout}
            >
              Logout {user.email}
            </button>
          </>
        ) : (
          <Link href={routerConfig.login.path}>
            <a className="text-blue-500 hover:text-blue-400">Login</a>
          </Link>
        )}
      </div>
    </nav>
  )
}
