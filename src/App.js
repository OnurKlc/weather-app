import { useContext, useEffect, useState } from 'react'
import { Context } from './Core/Context/Context'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import './App.scss'
import ErrorPopup from './Components/ErrorPopup/ErrorPopup'
import MainPage from './Pages/MainPage/MainPage'
import { images } from './Assets/images/index'

function App() {
	const { errorPopup, ready, background } = useContext(Context)
	const [bgImg, setBgImg] = useState(images.defaultImg)

	useEffect(() => {
		switch (background) {
			case 'Rain':
				setBgImg(images.rainImg)
				break
			case 'Snow':
				setBgImg(images.snowImg)
				break
			case 'Clouds':
				setBgImg(images.cloudImg)
				break
			case 'Clear':
				setBgImg(images.clearImg)
				break
			default:
				setBgImg(images.defaultImg)
		}
	}, [background])

	return (
		<div className="App" style={{ backgroundImage: `url(${bgImg})` }}>
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
