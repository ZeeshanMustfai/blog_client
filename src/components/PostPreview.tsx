import { Button, Card, Text } from '@nextui-org/react'
import { TPostPreview } from '../types'
import { Link } from 'react-router-dom'
const IMAGE_URL = import.meta.env.VITE_PF

const PostPreview = ({ postData, handleDeletePost }: TPostPreview) => {
	return (
		<Card>
			<Card.Body css={{ p: 0, m: 0 }}>
				<Card.Image
					objectFit='cover'
					src={`${IMAGE_URL}${postData.photo}`}
					width={'100%'}
					height={200}
				/>
			</Card.Body>
			<Card.Footer
				css={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<Text css={{ fontSize: '$2xl' }}>{postData.title}</Text>
				<div className='datePreview'>
					<Text>{postData.description}</Text>
				</div>
				<div className='blogAction'>
					<Link to={`/detail-post/${postData._id}`}>
						<Button auto>Read more</Button>
					</Link>
					<Link to={`/create-post/${postData._id}`}>
						<Button auto color='warning'>
							Update
						</Button>
					</Link>
					<Button
						auto
						color={'error'}
						onPress={() => handleDeletePost(postData?._id)}
					>
						Delete
					</Button>
				</div>
			</Card.Footer>
		</Card>
	)
}

export default PostPreview
