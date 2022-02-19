import type { NextApiRequest, NextApiResponse } from 'next'
import cities from 'all-the-cities';

import axios from 'axios';
const fetcher = (url: string, params: any) => axios.get(url, { params: params }).then(res => res.data);

const filterMax6 = async (city_name: string) => {
	let matches = 0;
	let arr = [];

	for (const city of cities) {
		if (city.name.toLowerCase().match(city_name.toLowerCase())) {
			matches += 1;

			let url = `http://api.waqi.info/feed/geo:${city.loc.coordinates[0]};${city.loc.coordinates[1]}/?token=${process.env.AQICN_API_TOKEN}`;
			try {
				let res = await fetcher(url, {});
				if (res.status == 'ok') {
					arr.push({
						name: city.name,
						country: city.country,
						aqi: res.data.aqi,
						loc: city.loc.coordinates
					});
				}
			} catch (error) {
			}
		}

		if (matches == 6) {
			break;
		}
	}

	return arr;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.q == undefined) {
		return res.status(400);
	}

	return res.status(200).json(await filterMax6(req.query.q as string));
}