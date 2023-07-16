import type { NextPage } from 'next'
import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'
import useStore from '../store'
import { useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { DashBoard } from '../components/DashBoard'

const Home: NextPage = () => {
  const { session, setSession } = useStore((state) => state)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  return (
    <Layout title={session ? 'Dashboard' : 'Auth'}>
      {!session ? <Auth /> : <DashBoard />}
    </Layout>
  )
}

export default Home
