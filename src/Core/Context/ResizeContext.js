import React, { useLayoutEffect, useState } from 'react'
import { RESPONSIVE } from '../Constants/Constants'

export const ResizeContext = React.createContext([{}, () => {}])

export function ResizeContextProvider({ children }) {
	const [size, setSize] = useState()

	useLayoutEffect(() => {
		function updateSize() {
			const width = window.innerWidth
			switch (true) {
				case width > RESPONSIVE.SUPERLARGEDESKTOP:
					setSize(RESPONSIVE.SUPERLARGEDESKTOP)
					break
				case width > RESPONSIVE.DESKTOP:
					setSize(RESPONSIVE.DESKTOP)
					break
				case width > RESPONSIVE.TABLET:
					setSize(RESPONSIVE.TABLET)
					break
				default:
					setSize(RESPONSIVE.MOBILE)
			}
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return (
		<ResizeContext.Provider
			value={{
				size
			}}
		>
			{children}
		</ResizeContext.Provider>
	)
}
