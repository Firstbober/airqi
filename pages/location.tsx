import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { ReactNode } from 'react';

import { CheckIcon } from '@heroicons/react/outline';

interface LocationProps {
  city: string,
  country: string
};

const Location: NextPage = (p) => {
  let props = p as LocationProps;

  return <div>
    <Head>
      <title>{props.city}, {props.country} - AirQi</title>
      <meta name="description" content={`Air Quality Index for the ${props.city}, ${props.country}.`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='max-w-4xl mr-auto ml-auto p-6 text-center h-screen'>
      <div className='flex justify-center h-2/3'>

        <div className='flex items-center flex-col w-1/2 h-fit mt-24 border rounded z-10 bg-white shadow-xl first:mr-6'>
          <div className='p-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-end w-full'>
            <span className='text-4xl font-bold mr-2'>{props.city}</span>
            <span className='text-xl text-gray-200 font-light'>in {props.country}</span>
          </div>
          <div className='p-6 flex items-center justify-between w-full'>
            <div className='text-left font-light w-fit'>
              <span className='font-bold text-4xl tracking-wide'>Great</span>
              <div className='mt-2 text-lg text-gray-500 flex justify-between w-full'>
                <span className='mr-3'>69 AQI</span>
                <span>0 IUV</span>
              </div>
            </div>
            <div className='bg-gradient-to-tr from-cyan-500 to-green-400 rounded-md p-2'>
              <CheckIcon className='h-10 text-white' />
            </div>
          </div>
          <hr className='w-full' />
          <div className='p-6 font-light text-xl text-gray-600'>
            Air quality is good with little to none air pollution
          </div>
        </div>

        {
          /*
          <div className='flex justify-center items-center flex-col w-fit h-full mt-24 border rounded z-10 bg-white shadow-xl first:mr-6'>
          aaa
        </div>
          */
        }
      </div>
    </main>
  </div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      city: 'Warsaw',
      country: 'Poland'
    } as LocationProps
  }
}

export default Location