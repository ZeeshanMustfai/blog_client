import { useState } from 'react'
import { Navbar, Text } from '@nextui-org/react'
import { navItems } from '../mock'
import styles from '../styles/components/navbar.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authReducer'

const mobileNavItem = () => {
	return (
		<>
			{navItems.map(({ id, name }) => (
				<Navbar.CollapseItem key={id} activeColor='primary' color='secondary'>
					{name}
				</Navbar.CollapseItem>
			))}
		</>
	)
}

const Nav = () => {
	const [open, setOpen] = useState<boolean>(false)
	const dispatch = useDispatch<any>()
	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<Navbar variant='sticky' maxWidth={'md'} disableBlur={true}>
			<Navbar.Toggle showIn='sm' />
			<Navbar.Brand className={styles.brand}>
				<Text color='primary' size={'$2xl'} css={{ fontWeight: '900' }}>
					<Link to='/'>Mustfai</Link>
				</Text>
			</Navbar.Brand>
			<Navbar.Content className='icon'>
				<Navbar.Item>
					<Link to='/create-post'>Add Post</Link>
				</Navbar.Item>
				<Navbar.Item onClick={handleLogout}>Logout</Navbar.Item>
			</Navbar.Content>
			<Navbar.Collapse>{mobileNavItem()}</Navbar.Collapse>
		</Navbar>
	)
}

export default Nav
