import React, { useCallback } from 'react'
import logo from '../../assets/logo2.png'
import { Button } from '../../components'
import icons  from '../../ultils/icons'
import { useNavigate,Link } from 'react-router-dom'
import { path } from '../../ultils/constant'


const {FiPlusCircle} = icons

const Header = () => {
  const navigate = useNavigate()
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN,{state: {flag}})
  }, [])


  return (
   <div className='w-1100'>
     <div className='w-full flex items-center justify-between my-1.5'>
      <Link to='/'>
      <img 
        src={logo} 
        alt='logo' 
        className='w-[240px] h-[70px] object-contain'
        />
      </Link>
      <div className='flex ítems-center gap-1'>
        
      <Button 
          text={'Đăng nhập'} 
          textColor='text-white' 
          bgColor='bg-[#3961fb]'
          onClick={() => goLogin(false)}
          />
      <Button 
          text={'Đăng ký'} 
          textColor='text-white' 
          bgColor='bg-[#3961fb]'
          onClick={() => goLogin(true)}
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