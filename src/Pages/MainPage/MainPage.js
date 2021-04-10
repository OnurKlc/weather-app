import { useContext, useEffect, useState } from 'react'
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import Carousel from 'react-multi-carousel'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Context } from '../../Core/Context/Context'
import WeatherCard from '../../Components/WeatherCard/WeatherCard'
import './MainPage.scss'
import { FAHRENHEIT, CELSIUS, RESPONSIVE } from '../../Core/Constants/Constants'

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: RESPONSIVE.SUPERLARGEDESKTOP },
		items: 5
	},
	desktop: {
		breakpoint: { max: RESPONSIVE.SUPERLARGEDESKTOP, min: RESPONSIVE.DESKTOP },
		items: 3
	},
	tablet: {
		breakpoint: { max: RESPONSIVE.DESKTOP, min: RESPONSIVE.TABLET },
		items: 2
	},
	mobile: {
		breakpoint: { max: RESPONSIVE.TABLET, min: 0 },
		items: 1
	}
}

export default function MainPage() {
	const [scaleValue, setScaleValue] = useState(CELSIUS)
	const [renderData, setRenderData] = useState()
	const [selectedDate, setSelectedDate] = useState(0)
	const [barData, setBarData] = useState([])
	const { weatherData, setBackground } = useContext(Context)

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
					average: Math.round(totalTemp / tempArr.length),
					day: previousDay
				}
				totalArr.push(obj)
				arr = []
				totalTemp = 0
			}
		}
		return totalArr
	}

	const onCarouselChange = (index, data) => {
		if (data.currentSlide > index) {
			setSelectedDate(selectedDate + 1)
		} else {
			setSelectedDate(selectedDate - 1)
		}
	}

	useEffect(() => {
		const listData = [...weatherData.list]
		const _renderData = formatWeatherData(listData)
		setRenderData(_renderData)
		console.log(_renderData)
	}, [weatherData])

	useEffect(() => {
		if (renderData) {
			const _barData = []
			renderData[selectedDate].data.map((item) => {
				let obj = {
					Date: item.dt_txt.substr(0, 10),
					Time: item.dt_txt.substr(10, 6) + ' AM',
					Degree: scaleValue === FAHRENHEIT ? Math.round(item.main.temp) : Math.round((item.main.temp - 32) / 1.8),
					Weather: item.weather[0].main
				}
				_barData.push(obj)
			})
			setBarData(_barData)
		}
	}, [selectedDate, renderData, scaleValue])

	function CustomTooltip({ payload, label, active }) {
		if (active) {
			return (
				<div className="custom-tooltip">
					<p style={{ color: 'rgb(102, 102, 102)' }}>
						{payload[0].value} &deg; {scaleValue === FAHRENHEIT ? ' F' : ' C'}
					</p>
				</div>
			)
		}

		return null
	}

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
				<Carousel responsive={responsive} afterChange={onCarouselChange}>
					{renderData.map((item, index) => (
						<div key={item.day} onClick={() => setSelectedDate(index)}>
							<WeatherCard data={item} scale={scaleValue} activeCard={index === selectedDate} />
						</div>
					))}
				</Carousel>
			)}
			<div onMouseLeave={() => setBackground('default')}>
				<ResponsiveContainer width="100%" height={220}>
					{barData && (
						<BarChart
							width={730}
							height={250}
							data={barData}
							barSize={90}
							margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
							onMouseEnter={(val) => setBackground(val.activePayload[0].payload.Weather)}
						>
							<XAxis dataKey="Time" />
							<YAxis dataKey="Degree" />
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="Degree"
								fill="#82ca9d"
								minPointSize={3}
								onMouseEnter={(val) => setBackground(val.Weather)}
							/>
						</BarChart>
					)}
				</ResponsiveContainer>
			</div>
		</main>
	)
}
