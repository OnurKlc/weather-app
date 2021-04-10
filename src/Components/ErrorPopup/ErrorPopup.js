import { useContext } from 'react'
import { Context } from '../../Core/Context/Context'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

function ErrorPopup() {
	const ctx = useContext(Context)

	return (
		<Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Error</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					A network error occured and weather data could not be fetched.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => ctx.setErrorPopup(false)} color="primary" autoFocus>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ErrorPopup
