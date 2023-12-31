import { useMutation } from 'react-query'
import useStore from '../store'
import { Comment, EditedComment } from '../types'
import { supabase } from '../utils/supabase'

export const useMutateComment = () => {
  const { resetEditedComment: reset } = useStore((state) => state)
  const createCommentMutation = useMutation(
    async (comment: Omit<Comment, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('comments').insert(comment)
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
  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ comment: comment.comment })
        .eq('id', comment.id)
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
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
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
  return { createCommentMutation, updateCommentMutation, deleteCommentMutation }
}
