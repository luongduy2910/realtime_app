import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { supabase } from '../utils/supabase'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { Comment } from '../types'

export const useSubcribeComment = (postId: string) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subs = supabase
      .from(`comments:post_id=eq.${postId}`)
      .on('INSERT', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])
        if (!previousComments) {
          previousComments = []
        }
        queryClient.setQueryData(
          ['comments', postId],
          [
            ...previousComments,
            {
              id: payload.new.id,
              comment: payload.new.comment,
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              post_id: payload.new.post_id,
            },
          ],
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])
        if (!previousComments) {
          previousComments = []
        }
        queryClient.setQueryData(
          ['comments', postId],
          previousComments.map((comment) =>
            comment.id === payload.new.id
              ? {
                  id: payload.new.id,
                  comment: payload.new.comment,
                  created_at: payload.new.created_at,
                  user_id: payload.new.user_id,
                  post_id: payload.new.post_id,
                }
              : comment,
          ),
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])
        if (!previousComments) {
          previousComments = []
        }
        queryClient.setQueryData(
          ['comments', postId],
          previousComments.filter((comment) => comment.id !== payload.old.id),
        )
      })
      .subscribe()
    const removeSubscription = async () => {
      await supabase.removeSubscription(subs)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
