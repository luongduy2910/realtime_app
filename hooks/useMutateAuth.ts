import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'
import { useState } from 'react'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }
  const signUpMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )

  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )

  return {
    signUpMutation,
    loginMutation,
    setEmail,
    setPassword,
    email,
    password,
  }
}
