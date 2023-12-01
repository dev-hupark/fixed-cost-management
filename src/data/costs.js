import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@auth/use-auth'
import { client } from '/lib/supabaseClient'


const useCosts = ( userId ) => {
    const [costs, setCosts] = useState([])
    const { loggedIn } = useAuth()

    useEffect(() => {
        void refresh()
    }, [userId])

    const refresh = useCallback(async () => {
        if( loggedIn ){
            const { data: costs, status } = await client // error
                .from('fixed_cost_list')
                .select('*')
                .eq('reg_id', userId)
                .order('reg_dt', { ascending: true })

            switch (status) {
                case 200:
                    setCosts(costs)
                    break
            }
        }
    }, [userId])

    return {
        costs,
        refresh: refresh
    }
}

const insertCost = async (cost) => {
    const { status } = await client // error
        .from('fixed_cost_list')
        .insert(cost)

    return status
}

const updateTodo = async (todo) => {
    const { status } = await client // error
        .from('todos')
        .update(todo)
        .eq('id', todo.id)

    return status
}

const deleteTodo = async (todo) => {
    const { status } = await client // error
        .from('todos')
        .delete()
        .eq('id', todo.id)

    return status
}

export {
    useCosts,
    insertCost,
    updateTodo,
    deleteTodo,
}