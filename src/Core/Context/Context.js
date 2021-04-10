import React, { useEffect, useState } from 'react'
import { APIService } from '../Service/APIService'

export const Context = React.createContext([{}, () => {}])

export function ContextProvider({ children }) {
	const [weatherData, setWeatherData] = useState()
	const [ready, setReady] = useState(false)
	const [errorPopup, setErrorPopup] = useState(false)

	const getWeatherData = () => {
		APIService.getWeatherData()
			.then((res) => {
				setWeatherData(res)
				setReady(true)
			})
			.catch(() => {
				setErrorPopup(true)
			})
	}

	useEffect(() => {
		getWeatherData()
	}, [])

	return (
		<Context.Provider
			value={{
				weatherData,
				setWeatherData,
				errorPopup,
				setErrorPopup,
				ready
			}}
		>
			{children}
		</Context.Provider>
	)
}
