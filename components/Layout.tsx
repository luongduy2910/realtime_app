import { BadgeCheckIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { FC, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ title = 'Realtime App', children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-col flex-1 items-center justify-center">
        {children}
      </main>
      <footer className="flex w-screen justify-center items-center py-5 border-t">
        <BadgeCheckIcon className="w-6 h-6 text-blue-500" />
      </footer>
    </div>
  )
}
