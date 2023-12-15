import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {useState} from "react";
import { insertCategory } from 'data/category';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const CategoryList = ({ user, categories }) => {
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
  )
}

CategoryList.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.object
}

export default CategoryList
