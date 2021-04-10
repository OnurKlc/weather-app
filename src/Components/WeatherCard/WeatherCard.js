import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FAHRENHEIT, RESPONSIVE } from '../../Core/Constants/Constants'
import { ResizeContext } from '../../Core/Context/ResizeContext'

export default function WeatherCard({ data, scale, activeCard }) {
	const { size } = useContext(ResizeContext)

	const useStyles = makeStyles(() => ({
		root: {
			width: size === RESPONSIVE.MOBILE ? '100%' : 290,
			cursor: 'pointer'
		},
		active: {
			boxShadow: '0px 0px 7px 5px rgba(245,0,87,0.6)'
		},
		city: {
			fontSize: 14
		}
	}))

	const classes = useStyles()

	return (
		<Card className={classes.root + ' ' + (activeCard ? classes.active : null)} variant="outlined">
			<CardContent>
				<Typography>{data.day}</Typography>
				<Typography variant="h6" component="h2">
					Temperature: {scale === FAHRENHEIT ? data.average : Math.round((data.average - 32) / 1.8)} &deg;{' '}
					{scale === FAHRENHEIT ? 'F' : 'C'}
				</Typography>
				<Typography className={classes.city}>Ankara, TR</Typography>
			</CardContent>
		</Card>
	)
}
