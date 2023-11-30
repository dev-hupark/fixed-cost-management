import React from 'react'
import styled from '@emotion/styled'
import { UserProvider } from '@auth/use-auth'
import Layout from 'components/layout/Layout'
import './_reset.css'

const Wrapper = styled.div`
`

const CustomApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Layout>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Layout>
  </UserProvider>
)

export default CustomApp