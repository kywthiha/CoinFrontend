import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { startClock } from '../actions'
import Examples from '../components/examples'
import Layout from '../components/layout'

const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
     <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
       
      </Link>
    </>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}