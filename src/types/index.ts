export type TUser = {
  user: string
  token?: string
  message?: string
}

type TAuth = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  user: TUser
}

export type TAuthReducer = {
auth: TAuth
}

export type TOneComment =  {
  id: string
  text: string
}
export type TOnePost = {
	_id: string
	title: string
	description: string
	photo?: string
  comments: TOneComment[]
}

export type TPostPreview = {
	postData: TOnePost
  handleDeletePost: (arg: string | undefined) => void
}