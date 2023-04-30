import {
	Button,
	Container,
	Input,
	Loading,
	Spacer,
	Text,
	Textarea,
} from '@nextui-org/react'
import {
	create_new_post,
	get_one_post,
	update_one_post,
	upload_image,
} from '../services/post-service'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styles from '../styles/components/post.module.scss'
import Error from './Error'
import { useNavigate, useParams } from 'react-router-dom'
import { TAuthReducer, TOnePost } from '../types'
import { useSelector } from 'react-redux'

const IMAGE_URL = import.meta.env.VITE_PF

const CreatePost = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [loading, setloading] = useState<boolean>(false)
	const [postData, setPostData] = useState<TOnePost>()
	const { user } = useSelector((state: TAuthReducer) => state.auth)
	const getDataForUpdate = async (postId: string | undefined) => {
		const post = await get_one_post(postId)
		setValue('title', post?.title)
		setValue('description', post?.description)
		setPostData(post)
	}

	useEffect(() => {
		if (id) {
			getDataForUpdate(id)
		}
	}, [id])

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm()

	const onPublish = async (formData: any) => {
		setloading(true)
		if (id) {
			if (Object.keys(formData?.image).length === 0) {
				const postRes = await update_one_post(id, formData)
				if (postRes) {
					setloading(false)
					toast.success('Post updated successfully')
					setTimeout(() => {
						navigate('/')
					}, 1000)
				}
			} else {
				const data = new FormData()
				const filename = Date.now() + formData.image[0].name
				console.log('filename', filename)
				data.append('name', filename)
				data.append('image', formData.image[0])
				formData.photo = filename

				const imgRes = await upload_image(data)
				const postRes = await update_one_post(id, formData)
				if (postRes) {
					setloading(false)
					toast.success('Post updated successfully')
					setTimeout(() => {
						navigate('/')
					}, 1000)
				}
			}
		} else {
			const data = new FormData()
			const filename = Date.now() + formData.image[0].name
			data.append('name', filename)
			data.append('image', formData.image[0])
			formData.photo = filename
			formData.user = user?.user
			const imgRes = await upload_image(data)
			const postRes = await create_new_post(formData)
			if (postRes) {
				setloading(false)
				toast.success('Post created successfully')
				setTimeout(() => {
					navigate('/')
				}, 1000)
			}
		}
	}

	return (
		<Container md>
			<div className={styles.postWrapper}>
				<Text size={'$2xl'}>Write Your Post Here</Text>
				<Spacer y={2} />
				<form onSubmit={handleSubmit(onPublish)}>
					<Input
						placeholder='Post title'
						fullWidth
						color='primary'
						{...register('title', { required: true })}
						name='title'
						bordered
					/>
					{errors.title && <Error>Title is required</Error>}
					<Spacer y={1.5} />
					<Textarea
						placeholder='description'
						fullWidth
						color='primary'
						{...register('description', { required: true })}
						name='description'
						bordered
					/>
					{errors.description && <Error>Short description required</Error>}
					<Spacer y={1.5} />

					{id && (
						<div>
							<Text>Previous image</Text>
							<img src={IMAGE_URL + postData?.photo} alt='img' />
						</div>
					)}
					<input
						type='file'
						{...register('image', { required: id ? false : true })}
						name='image'
					/>
					{errors.image && <Error>Cover image required</Error>}
					<Spacer y={2} />
					<Button auto type='submit'>
						Publish{' '}
						{loading && (
							<Loading color='white' size='xs' css={{ pl: '10px' }} />
						)}
					</Button>
				</form>
			</div>
		</Container>
	)
}

export default CreatePost
