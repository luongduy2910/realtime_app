import { FC } from 'react'
import { useQueryPosts } from '../hooks/useQueryPosts'
import { useSubscribePosts } from '../hooks/useSubcribePost'
import { PostForm } from './PostForm'
import { PostItem } from './PostItem'

export const Feed: FC = () => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <>
      <p>Feed</p>
      <PostForm />
      <ul data-testid="ul-post" className="my-5">
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            user_id={post.user_id}
            post_url={post.post_url}
          />
        ))}
      </ul>
    </>
  )
}
