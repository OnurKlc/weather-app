import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MainPage from '../Pages/MainPage/MainPage'
import { Context } from '../Core/Context/Context'
import weatherData from './mocks/mockApiData.json'

test('display radio buttons and barchart area', async () => {
	render(
		<Context.Provider value={{ weatherData }}>
			<MainPage />
		</Context.Provider>
	)

	expect(screen.getByRole('radiogroup')).toBeInTheDocument()

	expect(screen.getByTestId('bar-chart-area')).toBeInTheDocument()
})
