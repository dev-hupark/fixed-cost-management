import React, {useState} from "react";
import styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '@auth/use-auth'
import { useCategories } from 'data/category'
import { usePayments } from 'data/payment'
import { useCosts } from 'data/costs'
import List from 'components/cost/List'
import AddCostForm from 'components/cost/AddCostForm'
import CategoryList from 'components/my/CategoryList'
import PaymentList from 'components/my/PaymentList'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const PopupArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`

const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 20px;
  background-color: white;
  z-index: 1;
`

const ButtonArea = styled.div`
  display: flex;
  gap: 15px;
`

const Index = () => {
  const { user, loggedIn } = useAuth()
  const { costs, refresh: refreshCosts } = useCosts(user.id)
  const [ isPopup, setIsPopup ] = useState(false)
  const [ popState, setPopState ] = useState(0)
  const [ cost, setCurrentCost ] = useState({
    type: 0,
    category: 0,
    name: '',
    cost: 0,
    pay_date: '',
    pay_seq: 0,
    memo: '',
    reg_id: user.id
  })

  const { categories, refresh: refreshCategories } = useCategories(user.id)
  const { payments, refresh: refreshPayments } = usePayments(user.id)

  const cateManagementPopup = () => {
    setPopState(1)
    toggleIsPopup()
  }

  const payManagementPopup = () => {
    setPopState(1)
    toggleIsPopup()
  }
  const addCostPopup = () => {
    setCurrentCost({
      type: 0,
      category: 0,
      name: '',
      cost: 0,
      pay_date: '',
      pay_seq: 0,
      memo: '',
      reg_id: user.id
    })
    setPopState(0)
    toggleIsPopup()
  }

  const editCostPopup = ( cost ) => {
    setCurrentCost(cost)
    toggleIsPopup()
  }

  const toggleIsPopup = () => {
    setIsPopup(!isPopup)
  }

  return (
    <Wrapper>
      {!loggedIn ? (
        <p>
          <Link href="/signin">로그인</Link> 후 이용이 가능합니다.
        </p>
      ) : (
        <Wrapper>
          <ButtonArea>
            <button onClick={addCostPopup}>신규 등록</button>
            <button onClick={cateManagementPopup}>카테고리 관리</button>
            <button onClick={payManagementPopup}>결제수단 관리</button>
          </ButtonArea>
          <List
            costs={costs}
            categories={categories}
            payments={payments}
            editCostPopup={editCostPopup}
            refreshCosts={refreshCosts}
          />
          {isPopup &&
          <PopupArea>
            <PopupContent>
              <button onClick={toggleIsPopup}>닫기</button>
              { popState === 0 ?
                <AddCostForm
                  user={user}
                  curCost={cost}
                  categories={categories}
                  payments={payments}
                  refreshCosts={refreshCosts}
                />
                : popState === 1 ? <CategoryList user={user} categories={categories}/>
                  : <PaymentList user={user} payments={payments}/>}
            </PopupContent>
          </PopupArea>
          }
        </Wrapper>
      )}
    </Wrapper>
  )
}

export default Index