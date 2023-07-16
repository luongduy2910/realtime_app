import { FC } from 'react'
import { useQueryNotices } from '../hooks/useQueryNotices'
import { Spinner } from './Spinner'
import { NoticeItem } from './NoticeItem'
import { useSubcribeNotices } from '../hooks/useSubcribeNotices'
import { NoticeForm } from './NoticeForm'

export const Notification: FC = () => {
  const { data, status } = useQueryNotices()
  useSubcribeNotices()
  if (status === 'loading') <Spinner />
  return (
    <>
      <p className="mb-4 text-center">Notification</p>
      <NoticeForm />
      <ul className="my-5" data-testid="ul-notice">
        {data?.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </>
  )
}
