import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { insertCategory } from 'data/category'

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


const CategoryList = ({ user, categories, closePopup }) => {
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
      <button onClick={() => saveCategory(category)}>추가</button>
      <List>
        <TableHeader>
          <p>상위카테고리</p>
          <p>카테고리명</p>
          <p>카테고리설명</p>
        </TableHeader>
        {categories?.map((category, index) => (
          <ListItem key={category.id}>
            <p>
              {categories?.filter(c => c.id === category.high_lv_id).map((c, index) => (
                c.name
              ))}
            </p>
            <p>{category.name}</p>
            <p>{category.desc}</p>
            <button>수정</button>
            <button>삭제</button>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

CategoryList.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array
}

export default CategoryList
