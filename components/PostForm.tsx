import React, { FormEvent, memo } from 'react'
import useStore from '../store'
import { useMutatePost } from '../hooks/useMutatePost'
import { useUploadPostImg } from '../hooks/useUploadPostImg'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { CameraIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { Spinner } from './Spinner'

const PostFormMemo = () => {
  const {
    editedPost,
    updateEditedPost: update,
    session,
  } = useStore((state) => state)
  const { useMutateUploadPostImg } = useUploadPostImg()
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts',
  )
  const { createPostMutation, updatePostMutation } = useMutatePost()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        title: editedPost.title,
        post_url: editedPost.post_url,
        user_id: session?.user?.id,
      })
      setFullUrl('')
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        post_url: editedPost.post_url,
        title: editedPost.title,
      })
      setFullUrl('')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={editedPost.title}
        onChange={(e) => update({ ...editedPost, title: e.target.value })}
        className="my-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        placeholder="New Post"
      />
      <div className="my-3 flex justify-center">
        <button
          type="submit"
          className={`${
            useMutateUploadPostImg.isLoading || !editedPost.title
              ? 'bg-gray-300'
              : 'bg-indigo-600'
          } px-3 py-2 rounded text-sm text-white`}
          disabled={useMutateUploadPostImg.isLoading || !editedPost.title}
          data-testid="btn-post"
        >
          {editedPost.id ? 'Update' : 'Create'}
        </button>
      </div>
      <div className="flex justify-center">
        {postUrl && (
          <Image
            src={postUrl}
            alt="Image"
            width={150}
            height={150}
            className="rounded"
          />
        )}
      </div>
      <div className="flex justify-center">
        {useMutateUploadPostImg.isLoading && <Spinner />}
      </div>
      <div className="flex justify-center">
        <label htmlFor="post">
          <CameraIcon className="w-7 h-7 my-3 cursor-pointer text-gray-500" />
        </label>
        <input
          type="file"
          onChange={async (e) => {
            await useMutateUploadPostImg.mutateAsync(e)
            e.target.value = ''
          }}
          accept="image/*"
          id="post"
          className="hidden"
        />
      </div>
    </form>
  )
}

export const PostForm = memo(PostFormMemo)
