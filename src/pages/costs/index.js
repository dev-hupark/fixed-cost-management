import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@auth/use-auth'
import { useCosts, insertCost } from 'data/costs'
import { useCategories } from 'data/category'
import { usePayments } from 'data/payment'
import { format } from 'utils/date'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const InputForm = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  
  > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`

const TypeTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`

const CategoryTitle = styled.p`
  display: inline-block;
  width: 50px;
  
`

const Index = () => {
  const { user } = useAuth()
  const { costs, refresh: refreshCosts } = useCosts(user.id)
  const { categories, refresh: refreshCategories } = useCategories(user.id)
  const { payments, refresh: refreshPayments } = usePayments(user.id)
  const [ cost, setCurrentCost ] = useState({
    type: 0,
    category: 0,
    name: '',
    cost: 0
  })

  const saveCost = async (cost) => {
    setCurrentCost(prevState => ({ ...prevState, reg_id: user.id }))

    const status = await insertCost(cost)
    switch (status){
      case 201:
        refreshCosts()
        break
    }
  }

  return (
    <Wrapper>
      <InputForm>
        <div>
          <span>구분</span>
          <select onChange={e => setCurrentCost(prevState => ({...prevState, type: e.target.value}))}>
            <option value={0}>선택</option>
            {categories?.filter(category => category.high_lv_id === 0).map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <span>카테고리</span>
          <select onChange={e => setCurrentCost(prevState => ({...prevState, category: e.target.value}))}>
            <option value={0}>선택</option>
            {categories?.filter(category => category.high_lv_id !== 0).map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <span>결제수단</span>
          <select onChange={e => setCurrentCost(prevState => ({...prevState, pay_seq: e.target.value}))}>
            <option value={0}>선택</option>
            {payments?.map((payment) => (
              <option key={payment.id} value={payment.id}>{payment.name}</option>
            ))}
          </select>
        </div>
        <div>
          <span>결제일</span>
          <input type="text" onChange={e => setCurrentCost(prevState => ({...prevState, pay_date: e.target.value}))}/>
        </div>
        <div>
          <span>항목명</span>
          <input type="text" onChange={e => setCurrentCost(prevState => ({...prevState, name: e.target.value}))}/>
        </div>
        <div>
          <span>금액</span>
          <input type="text" onChange={e => setCurrentCost(prevState => ({...prevState, cost: e.target.value}))}/>
        </div>
        <div>
          <span>비고</span>
          <input type="text" onChange={e => setCurrentCost(prevState => ({...prevState, memo: e.target.value}))}/>
        </div>
        <div>
          <button onClick={() => saveCost(cost)}>등록</button>
        </div>
      </InputForm>
      {costs?.map((cost, index) => (
        <List key={cost.id}>
          {(index === 0 || (index > 0 && cost.type !== costs[index - 1].type)) && (
            <TypeTitle>
              {categories?.filter(category => category.id === cost.type).map((category) => (
                category.name
              ))}
            </TypeTitle>
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
            {cost.name} / {cost.cost} / {format('YYYY-MM-DD', cost.reg_dt)}
          </div>
        </List>
      ))}
    </Wrapper>
  )
}

export default Index