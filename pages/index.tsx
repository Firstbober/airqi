import type { NextPage } from 'next'
import Head from 'next/head'

import { LocationMarkerIcon } from '@heroicons/react/outline';

const Home: NextPage = () => {
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
              <input
                type="text"
                placeholder='Your city here!'
                className='border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-indigo-500 h-12'
              />
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
