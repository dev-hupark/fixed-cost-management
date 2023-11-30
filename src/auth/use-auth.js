import { client } from '/lib/supabaseClient'
import {createContext, useContext, useEffect, useState} from 'react'

const UserContext = createContext({})
export const useAuth = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [ loading, setLoading ] = useState(true)
  const [ user, setUser ] = useState({})

  const fetchUser = async () => {
    const {data} = await client.auth.getSession()

    if (data.session !== null) {
      setUser(data.session.user)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const loggedIn = !!user.id

  const signOut = async () => {
    await client.auth.signOut()
    location.href = '/'
  }

  const onUnauthorized = () => {
    // TODO : 로그인 필요하다는 안내 띄움
    // TODO : 로그인 모달 띄움
  }

  return (
    <UserContext.Provider
      value={{
        onUnauthorized,
        signInWithSNS,
        signOut,
        loading,
        user,
        loggedIn,
        refresh: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const signInWithSNS = async (providerId) => {
  const response = await client.auth.signInWithOAuth({
    provider: providerId,
  })
}