import { NextPage } from 'next'
import { Authorizer, useAuthorizer } from '@authorizerdev/authorizer-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login: NextPage = () => {
  const { token } = useAuthorizer()
  const router = useRouter()

  const redirectToLastPath = async () =>
    await router.push(String(router?.query?.lastPath || '/'))

  useEffect(() => {
    if (token) {
      redirectToLastPath().then()
    }
  }, [])

  return !token ? (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="my-10 text-4xl">Login</h1>
      <Authorizer
        onLogin={() => {
          redirectToLastPath().then()
        }}
      />
    </div>
  ) : (
    <></>
  )
}

export default Login
