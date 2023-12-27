import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import { insertPayment } from 'data/payment'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  > div {
    display: flex;
    gap: 20px;
  }
`

const TableHeader = styled.div`
  display: flex;
  gap: 20px;
  > p {
    width: 100px;
  }
`

const ListItem = styled.div`
  display: flex;
  gap: 20px;
  
  > p {
    width: 100px;
  }
`

const PaymentList = ({ user, payments }) => {
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
      <List>
        <TableHeader>
          <p>결제수단명</p>
          <p>설명</p>
        </TableHeader>
        {payments?.map((payment, index) => (
          <ListItem key={payment.id}>
            <p>{payment.name}</p>
            <p>{payment.desc}</p>
            <button>수정</button>
            <button>삭제</button>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )

}

PaymentList.propTypes = {
  user: PropTypes.object,
  payments: PropTypes.array
}

export default PaymentList
