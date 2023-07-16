import { FC, FormEvent, useState } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { Layout } from './Layout'

export const Auth: FC = () => {
  const [isLogin, setisLogin] = useState(true)
  const {
    email,
    password,
    setEmail,
    setPassword,
    signUpMutation,
    loginMutation,
  } = useMutateAuth()
  if (loginMutation.isLoading || signUpMutation.isLoading)
    return <div>Loading...</div>
  if (loginMutation.isError || signUpMutation.isError)
    return <div>Error...</div>
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      signUpMutation.mutate()
    }
  }
  return (
    <>
      <ShieldCheckIcon className="mb-3 w-10 h-10 text-blue-500" />
      <form className="flex flex-col" onSubmit={submitHandler}>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-3 px-3 py-2 text-sm placeholder-gray-500 border rounded border-gray-500 hover:border-indigo-600 focus:outline-none"
          placeholder="examle@gmail.com"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-3 px-3 py-2 text-sm placeholder-gray-500 border rounded border-gray-500 hover:border-indigo-600 focus:outline-none"
          placeholder="Your password"
        />
        <div className="flex justify-between items-center">
          <span
            onClick={() => setisLogin(!isLogin)}
            className="text-gray-600 text-sm cursor-pointer hover:underline"
          >
            Change mode?
          </span>
          <button
            type="submit"
            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-700 text-sm rounded text-white"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    </>
  )
}
