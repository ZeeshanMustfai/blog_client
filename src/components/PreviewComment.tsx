import { Avatar, Text } from '@nextui-org/react'

type TPreviewComment = {
	comment?: string
}

const PreviewComment = ({ comment }: TPreviewComment) => {
	return (
		<div className='previewComment'>
			<Avatar size='lg' src='https://i.pravatar.cc/300?u=a042581f4e29026707d' />
			<Text css={{ pl: '10px' }}>{comment || 'Hello world'}</Text>
		</div>
	)
}

export default PreviewComment
