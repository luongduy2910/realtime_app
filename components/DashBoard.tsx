import { FC, Suspense } from 'react'
import { supabase } from '../utils/supabase'
import { ExclamationCircleIcon, LogoutIcon } from '@heroicons/react/solid'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import { UserProfile } from './UserProfile'
import { useQueryClient } from 'react-query'
import useStore from '../store'
import { Notification } from './Notification'
import { Feed } from './Feed'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const {
    resetEditedProfile: resetProfile,
    resetEditedNotice: resetNotice,
    resetEditedPost: resetPost,
  } = useStore((state) => state)
  const signOut = () => {
    resetPost()
    resetProfile()
    resetNotice()
    supabase.auth.signOut()
    queryClient.removeQueries(['profile'])
    queryClient.removeQueries(['notices'])
    queryClient.removeQueries(['posts'])
  }
  return (
    <>
      <LogoutIcon
        onClick={signOut}
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
      />
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Feed />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Notification />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}
