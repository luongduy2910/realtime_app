import { memo, Dispatch, SetStateAction, FC } from 'react'
import { EditedComment } from '../types'
import useStore from '../store'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryAvatar } from '../hooks/useQueryAvatar'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'

type Props = {
  id: string
  comment: string
  user_id: string | undefined
  setEditedComment: Dispatch<SetStateAction<EditedComment>>
}

const CommentItemMemo: FC<Props> = ({
  id,
  comment,
  user_id,
  setEditedComment,
}) => {
  const { session } = useStore((state) => state)
  const { deleteCommentMutation } = useMutateComment()
  const { data } = useQueryAvatar(user_id)
  const { fullUrl: avatarUrl } = useDownloadUrl(data?.avatar_url, 'avatars')

  return (
    <li className="my-3 flex items-center justify-between">
      <div className="flex">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            width={25}
            height={25}
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
        )}
        <span className="mx-1 text-sm">{comment}</span>
      </div>
      {session?.user?.id === user_id && (
        <div className="flex">
          <PencilAltIcon
            onClick={() => setEditedComment({ id, comment })}
            data-testid="pencil-comment"
            className="h-5 w-5 text-blue-500 cursor-pointer mx-1"
          />
          <TrashIcon
            onClick={() => deleteCommentMutation.mutate(id)}
            className="h-5 w-5 text-blue-500 cursor-pointer"
            data-testid="trash-comment"
          />
        </div>
      )}
    </li>
  )
}
export const CommentItem = memo(CommentItemMemo)
