import Container from 'components/layout/Container'
import styled from '@emotion/styled'
import { useAuth } from 'auth/use-auth'

const Wrapper = styled.div`
  display: flex;
  
  button {
    margin-left: auto;
  }
`
const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <Wrapper>
        <h1>Fixed cost management</h1>
        { Object.keys(user).length !== 0 &&
          <button onClick={signOut}>logout</button>
        }
      </Wrapper>
    </Container>
  )
}

export default Header
