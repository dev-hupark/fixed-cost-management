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
        .order('reg_dt', { ascending: true })

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

const insertCategory = async (categories) => {
  const { status } = await client // error
    .from('fixed_cost_category')
    .insert(categories)

  return status
}

export {
  useCategories,
  insertCategory,
}