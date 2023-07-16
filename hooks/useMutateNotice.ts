import { useMutation, useQueryClient } from 'react-query'
import { supabase } from '../utils/supabase'
import { EditedNotice, Notice } from '../types'
import useStore from '../store'

export const useMutateNotice = () => {
  const { resetEditedNotice: reset } = useStore((state) => state)
  const queryClient = useQueryClient()
  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, 'id' | 'created_at'>) => {
      const { error, data } = await supabase.from('notices').insert(notice)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        reset()
      },
      onError: (err: Error) => {
        alert(err.message)
        reset()
      },
    },
  )
  const updateNoticeMutation = useMutation(
    async (editedNotice: EditedNotice) => {
      const { data, error } = await supabase
        .from('notices')
        .update({ content: editedNotice.content })
        .eq('id', editedNotice.id)
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
  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('notices')
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
  return { createNoticeMutation, updateNoticeMutation, deleteNoticeMutation }
}
