import React, { useState } from 'react'
import styled from '@emotion/styled'
import { insertCost, updateCost } from 'data/costs'

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  > dl { display: flex; }
  > dl dt { width: 30%; }
  > dl dd { width: 70%; }
  > ul li { display: flex; gap: 20px; justify-content: center; }
`

const AddCostForm = ({ curCost, categories, payments, closePopup, refreshCosts }) => {
  const [ cost, setCost ] = useState(curCost)

  const saveCost = async (cost, type) => {
    if(!validation(cost)) return

    let status = 0
    if(type === 'I'){
      status = await insertCost(cost)
    } else if(type === 'U') {
      status = await updateCost(cost)
    }

    switch (status){
      case 201:
      case 204:
        refreshCosts()
        closePopup()
        break
    }
  }

  const validation = ( cost ) => {
    if(cost.type === 0){
      console.log('타입 입력 필요')
      return false
    } else if(cost.category === 0){
      console.log('카테고리 입력 필요')
      return false
    } else if(cost.name === ''){
      console.log('항목명 입력 필요')
      return false
    } else if(cost.cost === 0){
      console.log('금액이 0원입니다. 이대로 입력?')
      return false
    }
    return true
  }

  return (
    <InputForm>
      <ul>
        <li>고정지출 관리</li>
      </ul>
      <dl>
        <dt>구분</dt>
        <dd>
          <select onChange={e => setCost(prevState => ({...prevState, type: parseInt(e.target.value)}))} value={cost.type}>
            <option value={0}>선택</option>
            {categories?.filter(category => category.high_lv_id === 0).map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </dd>
      </dl>
      <dl>
        <dt>카테고리</dt>
        <dd>
          <select onChange={e => setCost(prevState => ({...prevState, category: parseInt(e.target.value)}))} value={cost.category}>
            <option value={0}>선택</option>
            {categories?.filter(category => category.high_lv_id !== 0).map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </dd>
      </dl>
      <dl>
        <dt>결제수단</dt>
        <dd>
          <select onChange={e => setCost(prevState => ({...prevState, pay_seq: parseInt(e.target.value)}))} value={cost.pay_seq}>
            <option value={0}>선택</option>
            {payments?.map((payment) => (
              <option key={payment.id} value={payment.id}>{payment.name}</option>
            ))}
          </select>
        </dd>
      </dl>
      <dl>
        <dt>결제일</dt>
        <dd>
          <input type="text" onChange={e => setCost(prevState => ({...prevState, pay_date: e.target.value}))} value={cost.pay_date ? cost.pay_date : ''}/>
        </dd>
      </dl>
      <dl>
        <dt>항목명</dt>
        <dd>
          <input type="text" onChange={e => setCost(prevState => ({...prevState, name: e.target.value}))} value={cost?.name}/>
        </dd>
      </dl>
      <dl>
        <dt>금액</dt>
        <dd>
          <input type="number" onChange={e => setCost(prevState => ({...prevState, cost: parseInt(e.target.value)}))} value={cost?.cost}/>
        </dd>
      </dl>
      <dl>
        <dt>비고</dt>
        <dd>
          <input type="text" onChange={e => setCost(prevState => ({...prevState, memo: e.target.value}))} value={cost.memo ? cost.memo : ''}/>
        </dd>
      </dl>
      <ul>
        <li>
          {cost.id !== undefined ?
            <button onClick={() => saveCost(cost, 'U')}>수정</button>
            : <button onClick={() => saveCost(cost, 'I')}>등록</button>
          }
        </li>
      </ul>
    </InputForm>
  )
}

export default AddCostForm