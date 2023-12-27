import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@auth/use-auth'
import { client } from '/lib/supabaseClient'


const useCategories = ( userId ) => {
  const [categories, setCategories] = useState([])
  const { loggedIn } = useAuth()

  useEffect(() => {
    void refresh()
  }, [userId])

  const refresh = useCallback(async () => {
    if( loggedIn ){
      const { data: categories, status } = await client // error
        .from('fixed_cost_category')
        .select('*')
        .eq('reg_id', userId)
        .order('high_lv_id, id')

      switch (status) {
        case 200:
          setCategories(categories)
          break
      }
    }
  }, [userId])

  return {
    categories,
    refresh: refresh
  }
}

const insertCategory = async (category) => {
  const { status } = await client // error
    .from('fixed_cost_category')
    .insert(category)

  return status
}

const deleteCategory = async (category) => {
  const { status } = await client // error
    .from('fixed_cost_category')
    .delete()
    .eq('id', category.id)

  return status
}

export {
  useCategories,
  insertCategory,
  deleteCategory,
}