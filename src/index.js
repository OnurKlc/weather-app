import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ContextProvider } from './Core/Context/Context'
import 'react-multi-carousel/lib/styles.css'

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
