import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@auth/use-auth'
import { useCosts } from 'data/costs'
import { useCategories } from 'data/category'
import { usePayments } from 'data/payment'
import { format } from 'utils/date'
import PaymentList from '/src/components/my/PaymentList'
import CategoryList from '/src/components/my/CategoryList'
import AddCostForm from '/src/components/cost/AddCostForm'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const CostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  > div {
    display: flex;
    gap: 20px;
  }
`

const ListItem = styled.div`
  display: flex;
  gap: 20px;
  
  > p {
    width: 100px;
  }
`


const TypeTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`

const TableHeader = styled.div`
  display: flex;
  gap: 20px;
  > p {
    width: 100px;
  }
`
const CategoryTitle = styled.p`
  display: inline-block;
  width: 100px;
  
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
  width: 500px;
  padding: 20px;
  background-color: white;
  z-index: 1;
`

const List = () => {
  const { user } = useAuth()
  const { costs, refresh: refreshCosts } = useCosts(user.id)
  const { categories, refresh: refreshCategories } = useCategories(user.id)
  const { payments, refresh: refreshPayments } = usePayments(user.id)
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

  const [ isPopup, setIsPopup ] = useState(false)

  const toggleIsPopup = () => {
    setIsPopup(!isPopup);
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
    toggleIsPopup()
  }
  const editCostPopup = ( cost ) => {
    setCurrentCost(cost)
    toggleIsPopup()
  }

  return (
    <Wrapper>
      <div>
        <button onClick={addCostPopup}>신규 등록</button>
      </div>
      {costs?.map((cost, index) => (
        <CostList key={cost.id}>
          {(index === 0 || (index > 0 && cost.type !== costs[index - 1].type)) && (
            <>
              <TypeTitle>
                {categories?.filter(category => category.id === cost.type).map(category => (
                  category.name
                ))}
              </TypeTitle>
              <TableHeader>
                <p>카테고리</p>
                <p>상세카테고리</p>
                <p>금액</p>
                <p>결제수단</p>
                <p>결제일</p>
              </TableHeader>
            </>
          )}
          <div>
            <CategoryTitle>
              {(index === 0 || (index > 0 && cost.category !== costs[index - 1].category)) && (
                <>
                  {categories?.filter(category => category.id === cost.category).map((category, index) => (
                    category.name
                  ))}
                </>
              )}
            </CategoryTitle>
            <ListItem>
              <p>{cost.name}</p>
              <p>{cost.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
              <p>{cost.pay_seq}</p>
              <p>{cost.pay_date}</p>
              <button onClick={() => editCostPopup(cost)}>수정</button>
              <button>삭제</button>
            </ListItem>
          </div>
        </CostList>
      ))}
      <PaymentList user={user} payments={payments}/>
      <CategoryList user={user} categories={categories}/>

      {isPopup &&
        <PopupArea>
          <PopupContent>
              <AddCostForm
                user={user}
                curCost={cost}
                categories={categories}
                payments={payments}
                closePopup={toggleIsPopup}
                refreshCosts={refreshCosts}
              />
          </PopupContent>
        </PopupArea>
      }
    </Wrapper>
  )
}

export default List