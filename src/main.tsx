import ReactDOM from 'react-dom/client'
import './styles/global.scss'
import App from './App'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { lightTheme } from './theme'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<NextUIProvider theme={lightTheme}>
			<Provider store={store}>
				<App />
			</Provider>
		</NextUIProvider>
	</React.StrictMode>
)
