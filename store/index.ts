import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import {
  EditedComment,
  EditedNotice,
  EditedPost,
  EditedProfile,
} from '../types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedProfile: EditedProfile
  updatedEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
  editedNotice: EditedNotice
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedNotice: () => void
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void
  editedComment: EditedComment
  updatedEditedComment: (payload: EditedComment) => void
  resetEditedComment: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  editedProfile: {
    username: '',
    avatar_url: '',
    favorites: '',
  },
  setSession: (payload) => set({ session: payload }),
  updatedEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        favorites: payload.favorites,
      },
    }),
  resetEditedProfile: () =>
    set({ editedProfile: { username: '', avatar_url: '', favorites: '' } }),
  editedNotice: { id: '', content: '' },
  updateEditedNotice: (payload) =>
    set({ editedNotice: { id: payload.id, content: payload.content } }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
  editedPost: { id: '', title: '', post_url: '' },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        title: payload.title,
        post_url: payload.post_url,
      },
    }),
  resetEditedPost: () =>
    set({ editedPost: { id: '', title: '', post_url: '' } }),
  editedComment: { id: '', comment: '' },
  updatedEditedComment: (payload) =>
    set({ editedComment: { id: payload.id, comment: payload.comment } }),
  resetEditedComment: () => set({ editedComment: { id: '', comment: '' } }),
}))

export default useStore
