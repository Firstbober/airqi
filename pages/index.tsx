import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AirQi</title>
        <meta name="description" content="Simple web app to look up air quality for your city." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello, world!</h1>
      </main>
    </div>
  )
}

export default Home
