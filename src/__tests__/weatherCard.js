import '@testing-library/jest-dom'
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import WeatherCard from '../Components/WeatherCard/WeatherCard'

test('shows the temperature data and the city name', () => {
	const city = 'Ankara, TR'
	const mockData = {
		day: '2021.04.11',
		average: 15
	}
	render(<WeatherCard data={mockData} />)

	expect(screen.getByText(mockData.day)).toBeInTheDocument()

	expect(screen.getByText(city)).toBeInTheDocument()
})
