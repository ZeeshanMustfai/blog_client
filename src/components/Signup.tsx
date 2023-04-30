import { useEffect } from 'react'
import {
	Button,
	Card,
	Container,
	Input,
	Loading,
	Spacer,
	Text,
} from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styles from '../styles/components/login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Error from './Error'
import { signup, reset } from '../redux/authReducer'
import { TAuthReducer } from '../types'
import { ThunkDispatch } from '@reduxjs/toolkit'

const Signup = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
	const navigate = useNavigate()
	const { user, isLoading, isSuccess, message, isError } = useSelector(
		(state: TAuthReducer) => state.auth
	)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess) {
			toast.success('User register successfully!')
			navigate('/login')
		}

		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onSubmit = (data: any) => {
		dispatch(signup(data))
	}

	return (
		<Container md>
			<div className={styles.loginContainer}>
				<Card className={styles.loginCard}>
					<Text size={'$2xl'} color='primary'>
						Signup
					</Text>
					<Spacer y={1.5} />
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							fullWidth
							bordered
							labelPlaceholder='email'
							color='primary'
							{...register('email', { required: true })}
							name='email'
						/>
						{errors.email && <Error>Email is required</Error>}
						<Spacer y={1.5} />
						<Input.Password
							bordered
							labelPlaceholder='password'
							color='primary'
							{...register('password', { required: true })}
						/>
						{errors.password && <Error>Password is required</Error>}
						<Spacer y={1.5} />
						<div className={styles.submit}>
							<Button bordered auto rounded type='submit'>
								Signup
								{isLoading && (
									<Loading color='primary' size='xs' css={{ pl: '10px' }} />
								)}
							</Button>
						</div>
						<Spacer y={1.5} />
						<Text className={styles.dontAccount}>
							{`If you have already an account`}
							<Link to='/login' className={styles.register}>
								Login
							</Link>
						</Text>
					</form>
				</Card>
			</div>
		</Container>
	)
}

export default Signup
