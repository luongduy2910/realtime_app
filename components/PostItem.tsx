import { FC, Suspense, memo, useState } from 'react'
import { Post } from '../types'
import useStore from '../store'
import { useQueryAvatar } from '../hooks/useQueryAvatar'
import { useMutatePost } from '../hooks/useMutatePost'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import Image from 'next/image'
import {
  ChatAlt2Icon,
  ExclamationCircleIcon,
  PencilAltIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { Spinner } from './Spinner'
import { Comments } from './Comments'
import { ErrorBoundary } from 'react-error-boundary'

const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  user_id,
  post_url,
}) => {
  const [openComments, setopenComments] = useState(false)
  const { updateEditedPost: update, session } = useStore((state) => state)
  const { data } = useQueryAvatar(user_id)
  const { deletePostMutation } = useMutatePost()
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    data?.avatar_url,
    'avatars',
  )
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts',
  )
  return (
    <>
      <li className="w-80">
        <div className="my-3 w-full pt-2 border-t border-dashed border-gray-400">
          <div className="flex items-center justify-between">
            <div className="flex">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  className="rounded-full"
                  width={25}
                  height={25}
                />
              ) : (
                <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
              )}
              <span>{title}</span>
            </div>
            {session?.user?.id === user_id && (
              <div className="flex pr-4">
                <PencilAltIcon
                  data-testid="pencil-post"
                  className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                  onClick={() => {
                    update({
                      id,
                      title,
                      post_url,
                    })
                  }}
                />
                <TrashIcon
                  data-testid="trash-post"
                  className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                  onClick={() => deletePostMutation.mutate(id)}
                />
              </div>
            )}
          </div>
          <div className="my-3 flex justify-center">
            {postUrl && (
              <Image
                src={postUrl}
                alt="Image"
                className="rounded-lg"
                width={300}
                height={220}
              />
            )}
          </div>
          <div className="my-3 flex justify-center">
            {(isLoadingAvatar || isLoadingPost) && <Spinner />}
          </div>
          <ChatAlt2Icon
            onClick={() => setopenComments(!openComments)}
            className="ml-2 h-6 w-6 cursor-pointer text-blue-500"
            data-testid="open-comments"
          />
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense
              fallback={
                <div className="flex justify-center">
                  <Spinner />
                </div>
              }
            >
              <div className="flex justify-center">
                {openComments && <Comments postId={id} />}
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </li>
    </>
  )
}

export const PostItem = memo(PostItemMemo)
