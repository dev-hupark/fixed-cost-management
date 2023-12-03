import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@auth/use-auth'
import { usePaments, insertPayment } from 'data/payment'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { user } = useAuth()
  const [ payment, setCurrentPayment ] = useState({
    pay_name: '',
    pay_desc: '',
    use_yn: 'Y',
    reg_id: user.id,
  })


  const savePayment = async (payment) => {
    setCurrentPayment((prevState) => ({ ...prevState, reg_id: user.id }))

    const status = await insertPayment(payment)
    switch (status){
      case 201:
        break
    }
  }

  return (
    <Wrapper>
      <div>
        <span>결제수단명</span>
        <input type="text" onChange={e => setCurrentPayment((prevState) => ({...prevState, name: e.target.value}))}/>
      </div>
      <div>
        <span>결제수단 설명</span>
        <input type="text" onChange={e => setCurrentPayment((prevState) => ({...prevState, desc: e.target.value}))}/>
      </div>
      <button onClick={() => savePayment(payment)}>등록</button>
    </Wrapper>
  );
}

export default Index