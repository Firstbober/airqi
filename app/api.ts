import axios from 'axios';
const fetcher = (url: string, params: any) => axios.get(url, { params: params }).then(res => res.data);
const aqi = require('aqi-us');

let cache = {} as any;

setInterval(() => {
	cache = {};
}, 10 * 60 * 1000);

export async function getAQIForLocation(x: number, z: number) {
	if(cache[`${x},${z}`] != undefined) {
		return cache[`${x},${z}`];
	}

	let url = `https://docs.openaq.org/v2/latest`;
	let res = await fetcher(url, {
		limit: 2,
		page: 1,
		offset: 0,
		sort: 'desc',
		coordinates: `${x},${z}`,
		radius: 10_0000,
		order_by: 'lastUpdated'
	});

	if (res.results.length > 0) {
		let location = res.results[0];
		let aqis = [];

		for(const measurement of location.measurements) {
			if(measurement.unit != 'µg/m³')
				continue;

			if(measurement.parameter == 'o3') {
				aqis.push(aqi.o3_8hr(measurement.value));
			}

			if(measurement.parameter == 'pm10') {
				aqis.push(aqi.pm10(measurement.value));
			}

			if(measurement.parameter == 'pm25') {
				aqis.push(aqi.pm25(measurement.value));
			}

			if(measurement.parameter == 'no2') {
				aqis.push(aqi.no2(measurement.value));
			}
		}

		cache[`${x},${z}`] = Math.max(...aqis);
		return Math.max(...aqis);
	} else {
		throw new Error("No results");
	}
}