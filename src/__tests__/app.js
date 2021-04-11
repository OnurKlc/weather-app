import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import { Context } from '../Core/Context/Context'

const renderApp = (errorPopup, ready) => {
	return render(
		<Context.Provider
			value={{
				errorPopup,
				ready
			}}
		>
			<App />
		</Context.Provider>
	)
}

test('display spinner on load', async () => {
	renderApp(false, false)

	expect(screen.getByTestId('spinner')).toBeInTheDocument()
})

test('display popup on error', async () => {
	renderApp(true, true)

	expect(screen.getByText('Error')).toBeInTheDocument()
})

test('display main page on ready', async () => {
	renderApp(false, true)

	expect(screen.getByTestId('main')).toBeInTheDocument()
})
