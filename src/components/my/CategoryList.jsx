import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { insertCategory, deleteCategory } from 'data/category'

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


const CategoryList = ({ user, categories, closePopup, refresh }) => {
  const [ category, setCurrentCategory ] = useState({
    high_lv_id: 0,
    name: '',
    desc: '',
    use_yn: 'Y',
    reg_id: user.id,
  })

  const saveCategory = async (category) => {
    setCurrentCategory((prevState) => ({ ...prevState, reg_id: user.id }))

    const status = await insertCategory(category)
    switch (status){
      case 201:
        refresh()
        break
    }
  }

  const removeCategory = async (category) => {
    if(confirm('삭제 하시겠습니까?')){
      const status = await deleteCategory(category)
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
            {/*<button>수정</button>*/}
            <button onClick={() => removeCategory(category)}>삭제</button>
          </ListItem>
        ))}
        <ListItem>
          <p>
            <select onChange={e => setCurrentCategory((prevState) => ({...prevState, high_lv_id: e.target.value}))}>
              <option value={0}>root</option>
              {categories?.map((category, index) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </p>
          <p>
            <input type="text" onChange={e => setCurrentCategory((prevState) => ({...prevState, name: e.target.value}))}/>
          </p>
          <p>
            <input type="text" onChange={e => setCurrentCategory((prevState) => ({...prevState, desc: e.target.value}))}/>
          </p>
          <button onClick={() => saveCategory(category)}>추가</button>
        </ListItem>
      </List>
    </Wrapper>
  )
}

CategoryList.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array
}

export default CategoryList
