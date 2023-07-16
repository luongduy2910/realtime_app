export type AuthForm = {
  email: string
  password: string
}

export type Profile = {
  id: string | undefined
  updated_at: string
  created_at: string
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

export type EditedProfile = {
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

export type Notice = {
  id : string
  created_at : string
  user_id : string | undefined
  content : string
}

export type EditedNotice = {
  id : string
  content : string
}

export type Post = {
  id : string
  title : string
  post_url : string
  created_at : string
  user_id : string | undefined
}

export type EditedPost = {
  id : string
  title : string
  post_url : string
}

export type Comment = {
  id : string
  comment : string
  post_id : string
  user_id : string | undefined
  created_at : string
}

export type EditedComment = {
  id : string
  comment : string
}
