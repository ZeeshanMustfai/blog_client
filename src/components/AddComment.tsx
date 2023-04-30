import { Button, Card, Input, Spacer, Text, Textarea } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import CommentPreview from './PreviewComment'
import Error from './Error'
import { create_new_comment } from '../services/comment-service'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { TOneComment } from '../types'

type TAddComment = {
	commentList: TOneComment[] | undefined
	getPostComment: VoidFunction
}
const AddComment = ({ commentList, getPostComment }: TAddComment) => {
	const { id } = useParams()
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = async (formData: any) => {
		const response = await create_new_comment(id, { text: formData?.comment })
		if (response) {
			getPostComment()
			reset()
			toast.success('Comment successfully added to post')
		}
	}

	return (
		<Card css={{ padding: '20px', marginTop: '$10' }}>
			<Text size='$2xl'>Leave Comment</Text>
			<Spacer y={0.5} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Textarea
					placeholder='Write here '
					bordered
					fullWidth
					{...register('comment', { required: true })}
				/>
				{errors?.comment && <Error>This is required</Error>}
				<Spacer y={1} />
				<Button auto type='submit' css={{ width: 'fit-content' }}>
					Submit
				</Button>
			</form>
			{commentList?.map(({ id, text }) => {
				return <CommentPreview comment={text} key={id} />
			})}
		</Card>
	)
}

export default AddComment
