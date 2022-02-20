import type { NextApiRequest, NextApiResponse } from 'next'
import cities from 'all-the-cities';

import adminCodes from '../../resources/admin1CodesASCII.json';
import { getAQIForLocation } from '../../app/api';

const filterMax6 = async (city_name: string) => {
	let matches = 0;
	let arr: { id: number, name: string; country: string; aqi: any; adm_div: any; }[] = [];

	for (const city of cities) {
		if (city.name.toLowerCase().match(city_name.toLowerCase())) {
			matches += 1;

			try {
				let aqi = await getAQIForLocation(city.loc.coordinates[1], city.loc.coordinates[0]);

				let el = {
					id: city.cityId,
					name: city.name,
					country: city.country,
					aqi: aqi,
					adm_div: (adminCodes.countries as any)[city.country][city.adminCode]
				};

				if (!arr.includes(el))
					arr.push(el);
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