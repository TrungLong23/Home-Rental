import React , {useEffect}from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import  {Navigation,Search} from  './index'
import { Intro, Contact } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  },[])

  useEffect(() =>{
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent()
        )
    }, 1000)
  }, [isLoggedIn])

  return (
    <div className='w-full flex flex-col items-center h-full'>
        <Header/>
        <Navigation />
        {isLoggedIn &&  <Search/>}
        <div className='w-4/5 flex flex-col items-start justify-start my-6 '>
            <Outlet />
        </div>
            <Intro />
            <Contact />
    </div>
   
  )
}

export default Home