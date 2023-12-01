import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@auth/use-auth'
import { useCosts, insertCost } from 'data/costs'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { user } = useAuth()
  const { costs, refresh: refreshCosts } = useCosts(user.id)
  const [ cost, setCurrentCost ] = useState({
    type: '0',
    category: '',
    cost: 0,
    reg_id: user.id,
  })


  const saveCost = async (cost) => {
    setCurrentCost((prevState) => ({ ...prevState, reg_id: user.id }))

    console.log(cost)

    const status = await insertCost(cost)
    switch (status){
      case 201:
        refreshCosts()
        break
    }
  }

  return (
      <Wrapper>
        <div>
          <span>구분</span>
          <select onChange={e => setCurrentCost((prevState) => ({ ...prevState, type: e.target.value }))}>
            <option value="0">수입</option>
            <option value="1">지출</option>
          </select>
        </div>
        <div>
          <span>카테고리</span>
          <input type="text" onChange={e => setCurrentCost((prevState) => ({ ...prevState, category: e.target.value }))}/>
        </div>
        <div>
          <span>금액</span>
          <input type="text" onChange={e => setCurrentCost((prevState) => ({ ...prevState, cost: e.target.value }))}/>
        </div>
        <button onClick={() => saveCost(cost)}>등록</button>
        {costs?.map((cost) => (
          <div key={cost.id}>
            <div>{cost.id} / {cost.type} / {cost.category}  / {cost.cost} / {cost.reg_dt}</div>
          </div>
        ))}
      </Wrapper>
  )
}

export default Index