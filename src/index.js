import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ContextProvider } from './Core/Context/Context'
import 'react-multi-carousel/lib/styles.css'
import { ResizeContextProvider } from './Core/Context/ResizeContext'

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<ResizeContextProvider>
				<App />
			</ResizeContextProvider>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
