import axios from 'axios'

export const APIService = {
	getWeatherData
}

function getWeatherData() {
	return axios({
		url: process.env.REACT_APP_API_URL + 'data/2.5/forecast',
		params: {
			q: 'Munich,de',
			APPID: process.env.REACT_APP_API_KEY,
			cnt: 40
		},
		method: 'GET',
		withCredentials: true
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			throw err
		})
}