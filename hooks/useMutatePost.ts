import useStore from '../store'
import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'
import { EditedPost, Post } from '../types'

export const useMutatePost = () => {
  const { resetEditedPost: reset } = useStore((state) => state)
  const createPostMutation = useMutation(
    async (post: Omit<Post, 'created_at' | 'id'>) => {
      const { error, data } = await supabase.from('posts').insert(post)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )
  const updatePostMutation = useMutation(
    async (editedPost: EditedPost) => {
      const { error, data } = await supabase
        .from('posts')
        .update({ title: editedPost.title, post_url: editedPost.post_url })
        .eq('id', editedPost.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )
  const deletePostMutation = useMutation(
    async (id: string) => {
      const { error, data } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )
  return {createPostMutation , updatePostMutation,  deletePostMutation}
}
