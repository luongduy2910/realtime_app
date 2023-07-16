import { Dispatch, FC, FormEvent, SetStateAction, memo } from 'react'
import { Comment, EditedComment } from '../types'
import useStore from '../store'
import { useMutateComment } from '../hooks/useMutateComment'
import { MailIcon } from '@heroicons/react/solid'

type Props = {
  postId: string
  editedComment: EditedComment
  setEditedComment: Dispatch<SetStateAction<EditedComment>>
}

const CommentFormMemo: FC<Props> = ({
  postId,
  editedComment,
  setEditedComment,
}) => {
  const { session } = useStore((state) => state)
  const { createCommentMutation, updateCommentMutation } = useMutateComment()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedComment.id === '') {
      await createCommentMutation.mutateAsync({
        comment: editedComment.comment,
        user_id: session?.user?.id,
        post_id: postId,
      })
      setEditedComment({ comment: '', id: '' })
    } else {
      await updateCommentMutation.mutateAsync({
        id: editedComment.id,
        comment: editedComment.comment,
      })
      setEditedComment({ comment: '', id: '' })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={editedComment.comment}
          onChange={(e) =>
            setEditedComment({ ...editedComment, comment: e.target.value })
          }
          className="my-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          placeholder="New Comment"
        />
        <button
          data-testid="btn-comment"
          type="submit"
          disabled={editedComment.comment ? false : true}
        >
          <MailIcon
            className={`ml-3 h-6 w-6 cursor-pointer ${
              editedComment.comment ? 'text-indigo-600' : 'text-gray-300'
            }`}
          />
        </button>
      </div>
    </form>
  )
}

export const CommentForm = memo(CommentFormMemo)
