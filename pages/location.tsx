import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next'

// Cities and countries for search and printing.
import cities from 'all-the-cities';
import countries from "i18n-iso-countries";

// Icons and api.
import { CheckIcon, ExclamationIcon, BanIcon } from '@heroicons/react/outline';
import { getAQIForLocation } from '../app/api';

interface LocationProps {
  error: boolean,
  city: string,
  country: string,
  aqi: number
}

const Location: NextPage = (p) => {
  let props = p as LocationProps;
  let page = <div>
    <Head>
      <title>{props.city}, {props.country} - AirQi</title>
      <meta name="description" content={`Air Quality Index for the ${props.city}, ${props.country}.`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='max-w-4xl mr-auto ml-auto p-6 text-center h-screen'>
      <div className='flex justify-center h-2/3'>

        <div className='flex items-center flex-col w-1/2 h-fit mt-24 border rounded z-10 bg-white shadow-xl first:mr-6'>
          <div className='p-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex flex-col items-start w-full'>
            <span className='text-4xl font-bold mr-2'>{props.city}</span>
            <span className='text-xl text-gray-200 font-light'>in {props.country}</span>
          </div>
          <div className='p-6 flex items-center justify-between w-full'>
            <div className='text-left font-light w-fit'>
              <span className='font-bold text-4xl tracking-wide'>{
                // Yeee, pretty big amount of ternary operators
                // but whatever.
                props.aqi >= 0 && props.aqi <= 50
                  ? 'Great'
                  : props.aqi >= 51 && props.aqi <= 100
                    ? 'Average'
                    : props.aqi >= 101 && props.aqi <= 150
                      ? 'Bad'
                      : props.aqi >= 151 && props.aqi <= 200
                        ? 'Reduce exposure'
                        : props.aqi >= 201 && props.aqi <= 300
                          ? 'Dangerous'
                          : 'Do not exit'
              }</span>
              <div className='mt-2 text-lg text-gray-500 flex justify-between w-full'>
                <span>{props.aqi} AQI</span>
              </div>
            </div>

            {
              // Here too...
              props.aqi >= 0 && props.aqi <= 50
                ? <div className='bg-gradient-to-tr from-cyan-500 to-green-400 rounded-md p-2'>
                  <CheckIcon className='h-10 text-white' />
                </div>
                : props.aqi >= 51 && props.aqi <= 100
                  ? <div className='bg-gradient-to-tr from-green-500 to-yellow-400 rounded-md p-2'>
                    <ExclamationIcon className='h-10 text-white' />
                  </div>
                  : props.aqi >= 101 && props.aqi <= 150
                    ? <div className='bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-md p-2'>
                      <ExclamationIcon className='h-10 text-white' />
                    </div>
                    : props.aqi >= 151 && props.aqi <= 200
                      ? <div className='bg-gradient-to-tr from-orange-500 to-red-400 rounded-md p-2'>
                        <ExclamationIcon className='h-10 text-white' />
                      </div>
                      : props.aqi >= 201 && props.aqi <= 300
                        ? <div className='bg-gradient-to-tr from-red-500 to-purple-600 rounded-md p-2'>
                          <BanIcon className='h-10 text-white' />
                        </div>
                        : <div className='bg-gradient-to-tr from-purple-500 to-black rounded-md p-2'>
                          <BanIcon className='h-10 text-white' />
                        </div>
            }
          </div>
          <hr className='w-full' />
          <div className='p-6 font-light text-xl text-gray-600'>
            {
              // And here.
              props.aqi >= 0 && props.aqi <= 50
              ? 'Air quality is good with little to none pollution'
              : props.aqi >= 51 && props.aqi <= 100
                ? 'Unusually sensitive people should reduce prolonged exposure'
                : props.aqi >= 101 && props.aqi <= 150
                  ? 'Sensitive people should reduce prolonged exposure'
                  : props.aqi >= 151 && props.aqi <= 200
                    ? 'Reduce exposure and sensitive people should avoid physical activity'
                    : props.aqi >= 201 && props.aqi <= 300
                      ? 'Avoid exposure and physical activity'
                      : 'Do not exit outdoors unless required'
            }
          </div>
        </div>
      </div>
    </main>
  </div>;

  if (props.error) {
    return <div>
      <Head>
        <title>Error - AirQi</title>
        <meta name="description" content={`Got error while trying to fetch data.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fetching error!</h1>
      </main>
    </div>
  } else {
    return page;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let cid = context.query.cid as string;

  // Check if cid query parameter is passed.
  if (cid == undefined) {
    context.res.writeHead(301, {
      Location: '404'
    });
    context.res.end();
    return { props: {} };
  }

  // Find city using cid and get coordinates.
  let city = cities.filter((v) => v.cityId == parseInt(cid));
  let coords = city[0].loc.coordinates.reverse();

  let aqi = 0;

  // Get AQI from API.
  try {
    let res = await getAQIForLocation(coords[0], coords[1]);
    aqi = res;
  } catch (error) {
    return {
      props: {
        error: true
      } as LocationProps
    }
  }

  // Pass props.
  return {
    props: {
      city: city[0].name,
      country: countries.getName(city[0].country, 'en'),
      aqi
    } as LocationProps
  }
}

export default Location