import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FAHRENHEIT } from '../../Core/Constants/Constants'

const useStyles = makeStyles(() => ({
	root: {
		width: 275,
		cursor: 'pointer'
	},
	active: {
		boxShadow: '0px 0px 7px 5px rgba(245,0,87,0.6)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
}))

export default function WeatherCard({ data, scale, activeCard }) {
	const classes = useStyles()

	return (
		<Card className={classes.root + ' ' + (activeCard ? classes.active : null)} variant="outlined">
			<CardContent>
				<Typography>{data.day}</Typography>
				<Typography variant="h6" component="h2">
					Temperature: {scale === FAHRENHEIT ? data.average + ' F' : Math.round((data.average - 32) / 1.8) + ' C'}
				</Typography>
			</CardContent>
		</Card>
	)
}
