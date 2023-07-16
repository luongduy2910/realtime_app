import { supabase } from '../utils/supabase'
import { useQuery } from 'react-query'
import { Comment } from '../types'

export const useQueryComments = (postId : string) => {
  const getComments = async () => {
    const { error, data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('post_id' , postId)
    if (error) throw new Error(error.message)
    return data
  }
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: getComments,
    staleTime: Infinity,
  })
}
