import styled from '@emotion/styled'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  return (
    <Wrapper>
      <Link href="/costs">고정지출 목록</Link>
      <Link href="/my/category">카테고리 목록</Link>
      <Link href="/my/payment">결제수단 목록</Link>
    </Wrapper>
  );
}

export default Index