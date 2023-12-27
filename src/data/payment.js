import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@auth/use-auth'
import { client } from '/lib/supabaseClient'


const usePayments = ( userId ) => {
  const [payments, setPayments] = useState([])
  const { loggedIn } = useAuth()

  useEffect(() => {
    void refresh()
  }, [userId])

  const refresh = useCallback(async () => {
    if( loggedIn ){
      const { data: payments, status } = await client // error
        .from('fixed_cost_payment')
        .select('*')
        .eq('reg_id', userId)
        .order('reg_dt', { ascending: true })

      switch (status) {
        case 200:
          setPayments(payments)
          break
      }
    }
  }, [userId])

  return {
    payments,
    refresh: refresh
  }
}

const insertPayment = async (payment) => {
  const { status } = await client // error
    .from('fixed_cost_payment')
    .insert(payment)

  return status
}

const deletePayment = async (payment) => {
  const { status } = await client // error
    .from('fixed_cost_payment')
    .delete()
    .eq('id', payment.id)

  return status
}

export {
  usePayments,
  insertPayment,
  deletePayment,
}