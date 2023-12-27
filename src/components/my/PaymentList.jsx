import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import { insertPayment, deletePayment } from 'data/payment'

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
  
  > p input, >p select {
    width: 100%;
  }
`

const PaymentList = ({ user, payments, refresh, closePopup }) => {
  const [ payment, setCurrentPayment ] = useState({
    name: '',
    desc: '',
    use_yn: 'Y',
    reg_id: user.id,
  })

  const savePayment = async (payment) => {
    setCurrentPayment((prevState) => ({ ...prevState, reg_id: user.id }))

    const status = await insertPayment(payment)
    switch (status){
      case 201:
        refresh()
        break
    }
  }

  const removePayment = async (payment) => {
    if(confirm('삭제 하시겠습니까?')){
      const status = await deletePayment(payment)
      switch (status){
        case 204:
          refresh()
          break
      }
    }
  }

  return (
    <Wrapper>
      <List>
        <TableHeader>
          <p>결제수단명</p>
          <p>설명</p>
        </TableHeader>
        {payments?.map((payment, index) => (
          <ListItem key={payment.id}>
            <p>{payment.name}</p>
            <p>{payment.desc}</p>
            <button onClick={() => removePayment(payment)}>삭제</button>
          </ListItem>
        ))}
        <ListItem>
          <p><input type="text" onChange={e => setCurrentPayment((prevState) => ({...prevState, name: e.target.value}))}/></p>
          <p><input type="text" onChange={e => setCurrentPayment((prevState) => ({...prevState, desc: e.target.value}))}/></p>
          <button onClick={() => savePayment(payment)}>등록</button>
        </ListItem>
      </List>
    </Wrapper>
  )
}

PaymentList.propTypes = {
  user: PropTypes.object,
  payments: PropTypes.array
}

export default PaymentList
