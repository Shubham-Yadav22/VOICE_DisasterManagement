import dynamic from 'next/dynamic'

// Turn off SSR for this page
const Home = dynamic(() => import('../page'), { ssr: false })

export default function PageWrapper() {
  return <Home />
}
