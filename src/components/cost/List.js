import React, { useState } from 'react'
import styled from '@emotion/styled'
import { deleteCost } from 'data/costs'

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

const List = ({ costs, categories, payments, editCostPopup, refreshCosts }) => {
  const deleteCostChk = async ( cost ) => {
    if(confirm('삭제 하시겠습니까?')){
      await deleteCost(cost)
      await refreshCosts()
    }
  }

  return (
    <>
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
              <button onClick={() => deleteCostChk(cost)}>삭제</button>
            </ListItem>
          </div>
        </CostList>
      ))}
    </>
  )
}

export default List