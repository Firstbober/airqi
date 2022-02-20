/**
 * AirQi index page.
 *
 * Landing page with city search.
 */

// Next.js specific things.
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link'

// Fetcher for /api/search endpoint.
import axios from 'axios';
const fetcher = (url: string, params: any) => axios.get(url, { params: params }).then(res => res.data);

// List of countries ID, so full name can be displayed.
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Icon and react.
import { LocationMarkerIcon } from '@heroicons/react/outline';
import React from 'react';

interface CityInfo {
  id: number,
  name: string,
  country: string,
  aqi: number,
  adm_div: string
};

const Home: NextPage = () => {
  // Search states.
  const [editTimeout, setEditTimeout] = React.useState({} as NodeJS.Timeout);
  const [findings, setFindings] = React.useState([] as Array<CityInfo>);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [dropdownMessage, setDropdownMessage] = React.useState("Searching...");

  return (
    <div>
      <Head>
        <title>AirQi</title>
        <meta name="description" content="Simple web app to look up air quality for your city." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='max-w-4xl mr-auto ml-auto p-6 text-center h-screen'>
        <div className='flex justify-center h-full'>
          <div className='flex justify-center items-center flex-col w-fit h-fit mt-32 border rounded p-16 z-10 bg-white'>
            <h1 className="text-3xl font-light">
              <span className='
            before:block before:absolute before:-inset-1 before:-skew-y-1
            before:bg-gradient-to-r from-indigo-500 to-cyan-500
            relative inline-block p-3 mt-4 before:rounded text-6xl'>
                <span className='font-normal relative text-white '>
                  Air Quality Index
                </span>
              </span>

              <br /> <br />

              Just enter your city below and check it!
            </h1>

            <div className='mt-20 flex w-full'>
              <div className='relative w-full'>
                <input
                  type="text"
                  placeholder='Your city here!'
                  className='border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-indigo-500 h-12'
                  onChange={(event) => {
                    setFindings([]);
                    setDropdownMessage("Searching...");

                    clearTimeout(editTimeout);
                    setEditTimeout(setTimeout(async () => {
                      if (event.target.value.length > 0) {
                        try {
                          let res = await fetcher("/api/search", { q: event.target.value });
                          setFindings(res);

                          if (res.length == 0) {
                            setDropdownMessage("Nothing has been found");
                          }
                        } catch (error) { }
                      }
                    }, 500));

                    if (event.target.value.length == 0) {
                      setFindings([]);
                      setShowDropdown(false);
                      setDropdownMessage("Searching...");
                    } else {
                      setShowDropdown(true);
                    }
                  }}
                  onFocus={(event) => event.target.value.length > 0 ? setShowDropdown(true) : {}}
                />

                <div className={
                  'absolute bg-white w-full top-14 rounded shadow border p-2' +
                  (showDropdown ? '' : ' hidden')
                }>
                  {
                    findings.length > 0
                      ? findings.map((city, i) => {
                        return <Link href={`/location?cid=${city.id}`} key={`dropdown-city-${city.id}`}>
                          <a
                            className='flex justify-between font-light text-lg hover:bg-gray-100 p-2 rounded mt-1 first:mt-0'
                          >
                            <span title={`${city.name} - ${countries.getName(city.country, 'en')}`} className='truncate w-3/4 text-left'>
                              <b>{city.name}</b> - {countries.getName(city.country, 'en')}
                              <br />
                              <span className='text-sm text-gray-500'>{city.adm_div}</span>
                            </span>
                            <span className='text-gray-500'>{city.aqi} AQI</span>
                          </a>
                        </Link>;
                      })
                      : <span className='text-gray-400 font-light text-xl p-4'>{dropdownMessage}</span>
                  }
                </div>
              </div>

              <button
                className='ml-2 rounded-md bg-gradient-to-tr from-red-500 to-pink-500
                  w-14 h-12 flex justify-center items-center hover:scale-125 duration-150'
                title='Use location'
              >
                <LocationMarkerIcon className='h-8 text-white' />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
