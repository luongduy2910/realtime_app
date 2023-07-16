import { FC, memo } from 'react'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { Notice } from '../types'
import useStore from '../store'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const NoticeItemMemo: FC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const { deleteNoticeMutation } = useMutateNotice()
  const { updateEditedNotice: update, session } = useStore((state) => state)
  return (
    <li className="my-3">
      <span className="font-bold text-lg my-3">{content}</span>
      {user_id === session?.user?.id && (
        <div className="flex float-right ml-20">
          <PencilAltIcon
            className="w-7 h-7 cursor-pointer text-blue-500 mx-3"
            onClick={() => update({ id, content })}
          />
          <TrashIcon
            className="w-7 h-7 cursor-pointer text-blue-500"
            onClick={() => deleteNoticeMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  )
}

export const NoticeItem = memo(NoticeItemMemo)
