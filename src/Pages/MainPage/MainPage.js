import { useContext, useEffect, useState } from 'react'
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import Carousel from 'react-multi-carousel'
import { Context } from '../../Core/Context/Context'
import WeatherCard from '../../Components/WeatherCard/WeatherCard'
import './MainPage.scss'
import { FAHRENHEIT, CELSIUS } from '../../Core/Constants/Constants'

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
}

export default function MainPage() {
	const [scaleValue, setScaleValue] = useState(CELSIUS)
	const [renderData, setRenderData] = useState()
	const [selectedDate, setSelectedDate] = useState(0)
	const { weatherData } = useContext(Context)

	const handleScaleChange = (event, val) => {
		setScaleValue(val)
	}

	const formatWeatherData = (data) => {
		let arr = []
		let totalArr = []
		let totalTemp = 0
		for (let i = 1; i < data.length + 1; i++) {
			const day = data[i] ? data[i]['dt_txt'].substr(0, 10) : null
			const previousDay = data[i - 1]['dt_txt'].substr(0, 10)
			arr.push(data[i - 1])
			totalTemp += data[i - 1].main.temp
			if (day !== previousDay) {
				const tempArr = [...arr]
				const obj = {
					data: tempArr,
					average: Math.round(totalTemp / tempArr.length - 273.15),
					day: previousDay
				}
				totalArr.push(obj)
				arr = []
				totalTemp = 0
			}
		}
		return totalArr
	}

	const arrowClicked = (index, data) => {
		setSelectedDate(data.currentSlide)
	}

	useEffect(() => {
		const listData = [...weatherData.list]
		const _renderData = formatWeatherData(listData)
		setRenderData(_renderData)
		console.log(_renderData)
	}, [weatherData])

	return (
		<main id="main">
			<div className="radio-button-area">
				<FormControl component="fieldset">
					<RadioGroup aria-label="Degree Scale" name="scale" value={scaleValue} onChange={handleScaleChange}>
						<FormControlLabel value={CELSIUS} control={<Radio />} label={CELSIUS} />
						<FormControlLabel value={FAHRENHEIT} control={<Radio />} label={FAHRENHEIT} />
					</RadioGroup>
				</FormControl>
			</div>
			{renderData && (
				<Carousel responsive={responsive} afterChange={arrowClicked}>
					{renderData.map((item, index) => (
						<div key={item.day} onClick={() => setSelectedDate(index)}>
							<WeatherCard data={item} scale={scaleValue} activeCard={index === selectedDate} />
						</div>
					))}
				</Carousel>
			)}
		</main>
	)
}
