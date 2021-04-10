import { useContext, useEffect } from 'react'
import { Context } from './Core/Context/Context'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import './App.scss'
import ErrorPopup from './Components/ErrorPopup/ErrorPopup'
import MainPage from './Pages/MainPage/MainPage'

function App() {
	const { errorPopup, ready } = useContext(Context)

	useEffect(() => {}, [])

	return (
		<div className="App">
			<Container maxWidth="md">
				{errorPopup && <ErrorPopup />}
				{ready && <MainPage />}
				{!ready && !errorPopup && (
					<span className="spinner">
						<CircularProgress />
					</span>
				)}
			</Container>
		</div>
	)
}

export default App
