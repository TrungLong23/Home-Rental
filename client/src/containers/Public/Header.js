import React, { useCallback } from 'react'
import logo from '../../assets/logo2.png'
import { Button } from '../../components'
import icons  from '../../ultils/icons'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import Navigation from './Navigation'

const {FiPlusCircle} = icons

const Header = () => {
  const navigate = useNavigate()
  const goLogin = useCallback(() => {
    navigate(path.LOGIN)
  },[])

  return (
   <div className='w-1100'>
     <div className='w-full flex items-center justify-between my-1.5'>
      <img src={logo} alt='logo' className='w-[240px] h-[70px] object-contain'/>
      <div className='flex ítems-center gap-1'>
      <Button 
          text={'Đăng nhập'} 
          textColor='text-white' 
          bgColor='bg-[#3961fb]'
          onClick={goLogin}
          />
      <Button 
          text={'Đăng ký'} 
          textColor='text-white' 
          bgColor='bg-[#3961fb]'
          onClick={goLogin}
          />
      <Button 
          text={'Đăng tin'} 
          textColor='text-white' 
          bgColor='bg-secondary2' 
          IcAfter={FiPlusCircle}/>
      </div>
    </div>

    
   </div>

    
  )
}

export default Header
