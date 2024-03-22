import { useAuthorizer } from '@authorizerdev/authorizer-react'
import { useRouter } from 'next/router'
import { createContext, useEffect, useMemo, useRef } from 'react'
import { routerConfig } from '../../../config/rooter.config'

type RouterGuardContextProps = {
  loading: boolean
}
export const RouterGuardContext = createContext<RouterGuardContextProps>({
  loading: true,
})

const RouteGuardProvider = ({ children }: { children: JSX.Element }) => {
  const routerLoading = useRef(true)
  const { token, loading } = useAuthorizer()
  const router = useRouter()
  const lastPath = useRef(routerConfig.home.path)
  const protectedPaths = useMemo(
    () =>
      Object.values(routerConfig)
        .filter((root) => root.protected)
        .map((r) => r.path),
    [routerConfig]
  )

  const isProtected = (pathname: string) => {
    return !protectedPaths.indexOf(pathname)
  }

  const redirectToLogin = async () =>
    await router.push(routerConfig.login.path + '?lastPath=' + lastPath.current)

  useEffect(() => {
    if (router.pathname !== routerConfig.login.path) {
      lastPath.current = router.pathname
    }
  }, [router.pathname])

  useEffect(() => {
    if (!token && !loading && isProtected(router.pathname)) {
      redirectToLogin().then(() => {
        routerLoading.current = false
      })
    }

    routerLoading.current = false
  }, [token, loading, router.pathname])
  return (
    <RouterGuardContext.Provider
      value={{
        loading: routerLoading.current,
      }}
    >
      {children}
    </RouterGuardContext.Provider>
  )
}

export default RouteGuardProvider
