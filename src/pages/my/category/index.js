import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@auth/use-auth'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { user } = useAuth()
  const [ category, setCurrentCategory ] = useState({
    high_lv_id: 0,
    category_name: '',
    category_desc: '',
    use_yn: 'Y',
    reg_id: user.id,
  })


  const saveCategory = async (category) => {
    setCurrentCategory((prevState) => ({ ...prevState, reg_id: user.id }))

    const status = await insertCategory(category)
    switch (status){
      case 201:
        refreshCosts()
        break
    }
  }

  return (
    <Wrapper>
      <div>
        <span>상위 카테고리</span>
        <input type="text" onChange={e => setCurrentCategory((prevState) => ({...prevState, high_lv_id: e.target.value}))}/>
      </div>
      <div>
        <span>카테고리명</span>
        <input type="text" onChange={e => setCurrentCategory((prevState) => ({...prevState, category_name: e.target.value}))}/>
      </div>
      <div>
        <span>카테고리 설명</span>
        <input type="text" onChange={e => setCurrentCategory((prevState) => ({...prevState, category_desc: e.target.value}))}/>
      </div>
      <button onClick={() => saveCategory(category)}>등록</button>
    </Wrapper>
  );
}

export default Index