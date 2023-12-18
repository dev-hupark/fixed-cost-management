import styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '@auth/use-auth'
import List from 'components/cost/List'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { loggedIn } = useAuth()

  return (
    <Wrapper>
      {!loggedIn ? (
        <p>
          <Link href="/signin">로그인</Link> 후 이용이 가능합니다.
        </p>
      ) : (
        <List />
      )}
    </Wrapper>
  )
}

export default Index