import { FC, FormEvent, memo } from 'react'
import useStore from '../store'
import { useMutateNotice } from '../hooks/useMutateNotice'

const NoticeFormMemo: FC = () => {
  const {
    session,
    editedNotice,
    updateEditedNotice: update,
  } = useStore((state) => state)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNotice.id === '') {
      createNoticeMutation.mutate({
        user_id: session?.user?.id,
        content: editedNotice.content,
      })
    } else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={editedNotice.content}
        onChange={(e) => update({ ...editedNotice, content: e.target.value })}
        className="my-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        placeholder="New Notice"
      />
      <div className="my-3 flex justify-center">
        <button
          type="submit"
          data-testid="btn-notice"
          className={`rounded ${
            editedNotice.content ? 'bg-indigo-600' : 'bg-gray-300'
          } px-3 py-2 text-sm text-white`}
        >
          {editedNotice.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export const NoticeForm = memo(NoticeFormMemo)
