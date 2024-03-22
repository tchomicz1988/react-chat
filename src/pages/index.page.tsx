import Layout from 'components/layout/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <svg
          viewBox="0 0 636.58 429.44"
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: 'auto', width: '50%' }}
        >
          <path
            d="M169.57 231.57c72.961 5.044 129.91 47.518 129.91 98.512 0 41.444-37.869 76.586-91.124 91.124l-82.504 70.19v-65.264c-66.227-9.04-115.76-48.32-115.76-96.06 0-54.393 64.779-98.512 144.69-98.512 4.994 0 9.913-.336 14.777 0z"
            style={{
              color: '#000',
              fill: '#7d16d6',
              transform: 'translate(-10.104px, -169.87px)',
            }}
          />
          <path
            style={{
              color: '#000',
              fill: '#677ee8',
              paintOrder: 'fill',
              transform: 'translate(-10.104px, -169.87px)',
            }}
            d="M396.442 184.63c-107.62 7.439-191.62 70.09-191.62 145.31 0 61.13 55.858 112.97 134.41 134.41l121.69 103.53v-96.265c97.678-13.321 170.73-71.266 170.73-141.67 0-80.23-95.549-145.31-213.42-145.31-7.367 0-14.621-.496-21.796 0l.006-.005Z"
          />
        </svg>
      </div>
    </Layout>
  )
}

export default Home
