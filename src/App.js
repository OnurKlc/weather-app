import { useContext, useEffect } from 'react'
import { Context } from './Core/Context/Context'
import './App.scss'
import ErrorPopup from './Components/ErrorPopup/ErrorPopup'

function App() {
	const ctx = useContext(Context)

	useEffect(() => {
		console.log(ctx)
	}, [])
	return (
		<>
			{ctx.errorPopup && <ErrorPopup />}
			{ctx.ready && <div className="App">asd</div>}
		</>
	)
}

export default App
