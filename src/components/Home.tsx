import { Container, Grid, Text } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { delete_one_post, get_all_posts } from '../services/post-service'
import { TAuthReducer, TOnePost } from '../types'
import PostFilter from './PostFilter'
import PostPreview from './PostPreview'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector((state: TAuthReducer) => state.auth)
  const [posts, setPosts] = useState([])
  const [isUpdated, setIsUpdate] = useState<boolean>(false)

  const handleFilter = useCallback((search: string) => {
    if (search.length > 2) {
      console.log('search', search)
    }
  }, [])

  const getData = async () => {
    const data = await get_all_posts(user.user)
    setPosts(data)
  }

  const handleDeletePost = useCallback(
    async (id: string | undefined) => {
      const res = await delete_one_post(id)
      if (res) {
        setIsUpdate(!isUpdated)
      }
    },
    [isUpdated]
  )

  useEffect(() => {
    getData()
  }, [isUpdated])

  return (
    <Container md>
      <PostFilter handleFilter={handleFilter} />
      <Grid.Container gap={2} className='booksContainer'>
        {posts.length > 0 ? (
          posts.map((post: TOnePost) => {
            return (
              <Grid key={post._id} xs={12} sm={6} md={4}>
                <PostPreview
                  postData={post}
                  handleDeletePost={handleDeletePost}
                />
              </Grid>
            )
          })
        ) : (
          <div className='notFound'>
            <Text size={'$2xl'}>Posts not found yet!</Text>
          </div>
        )}
      </Grid.Container>
    </Container>
  )
}

export default Home
