import React from 'react'
import { Input } from '@nextui-org/react'

type TPostFilter = {
	handleFilter: (arg: string) => void
}

const PostFilter = ({ handleFilter }: TPostFilter) => {
	return (
		<div className='postsFilter'>
			<Input
				labelPlaceholder='Search posts'
				rounded
				size='lg'
				onChange={(e) => handleFilter(e.target.value)}
			/>
		</div>
	)
}

export default PostFilter
