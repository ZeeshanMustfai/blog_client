import {
	Button,
	Card,
	Container,
	Input,
	Loading,
	Spacer,
	Text,
} from '@nextui-org/react'
import { useEffect } from 'react'
import Error from './Error'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styles from '../styles/components/login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../redux/authReducer'
import { TAuthReducer } from '../types'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<any>()
	const { isError, isLoading, isSuccess, message, user } = useSelector(
		(state: TAuthReducer) => state.auth
	)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		if (data) {
			dispatch(login(data))
		}
	}

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			toast.success(user?.message as string)
			navigate('/')
		}

		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	return (
		<Container md>
			<div className={styles.loginContainer}>
				<Card className={styles.loginCard}>
					<Text size={'$2xl'} color='primary'>
						Login
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
								Login
								{isLoading && (
									<Loading color='primary' size='xs' css={{ pl: '10px' }} />
								)}
							</Button>
						</div>
						<Spacer y={1.5} />
						<Text className={styles.dontAccount}>
							{`If you don't have account`}
							<Link to='/signup' className={styles.register}>
								Register Here
							</Link>
						</Text>
					</form>
				</Card>
			</div>
		</Container>
	)
}

export default Login
