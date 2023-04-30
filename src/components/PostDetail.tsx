import { Container, Text, Spacer } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_one_post } from '../services/post-service'
import { TOnePost } from '../types'
import AddComment from './AddComment'
const IMAGE_URL = import.meta.env.VITE_PF

const PostDetail = () => {
	const { id } = useParams()
	const [postDetail, setPostDetail] = useState<TOnePost>()
	const [isCommentAdded, setIsCommentAdd] = useState<boolean>()

	const getPostComment = useCallback(() => {
		setIsCommentAdd(!isCommentAdded)
	}, [isCommentAdded])
	const getDetailPost = async (postId: string | undefined) => {
		const res = await get_one_post(postId)
		setPostDetail(res)
	}

	useEffect(() => {
		getDetailPost(id)
	}, [id, isCommentAdded])

	return (
		<Container md>
			<div>
				<img
					src={`${IMAGE_URL}${postDetail?.photo}`}
					alt={postDetail?.title}
					className={'detailImage'}
				/>
				<Spacer />
				<Text size={'$4xl'} color='secondary'>
					{postDetail?.title}
				</Text>
				<Text>{postDetail?.description}</Text>
			</div>
			<AddComment
				commentList={postDetail?.comments}
				getPostComment={getPostComment}
			/>
		</Container>
	)
}

export default PostDetail
