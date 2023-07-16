import { FC, memo, useState } from 'react'
import { EditedComment } from '../types'
import { useQueryComments } from '../hooks/useQueryComments'
import { useSubcribeComment } from '../hooks/useSubcribeComment'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'

type Props = {
  postId: string
}

const CommentsMemo: FC<Props> = ({ postId }) => {
  const [editedComment, setEditedComment] = useState<EditedComment>({
    id: '',
    comment: '',
  })
  const { data: comments } = useQueryComments(postId)
  useSubcribeComment(postId)
  return (
    <div className="w-60">
      <CommentForm
        editedComment={editedComment}
        postId={postId}
        setEditedComment={setEditedComment}
      />
      <ul data-testid="ul-comment" className="my-3">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            comment={comment.comment}
            user_id={comment.user_id}
            setEditedComment={setEditedComment}
          />
        ))}
      </ul>
    </div>
  )
}

export const Comments = memo(CommentsMemo)
