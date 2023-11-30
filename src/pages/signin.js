import Container from 'components/layout/Container'
import { useAuth } from 'auth/use-auth'

const Signin = () => {
  const { signInWithSNS } = useAuth()
  return (
    <Container>
      <button onClick={() => signInWithSNS('google')}>구글</button>
    </Container>
  )
}

export default Signin
