import React, { useCallback } from 'react'
import logo from '../../assets/logo2.png'
import { Button } from '../../components'
import icons  from '../../ultils/icons'
import { useNavigate,Link } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector,useDispatch } from 'react-redux'
import * as actions from '../../store/actions'


const {FiPlusCircle} = icons

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector(state => state.auth)
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN,{state: {flag}})
  }, [])


  return (
   <div className='w-3/5'>
     <div className='w-full flex items-center justify-between my-1.5'>
      <Link to='/'>
      <img 
        src={logo} 
        alt='logo' 
        className='w-[240px] h-[70px] object-contain'
        />
      </Link>
      <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        
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
                    </div>}
                    {isLoggedIn && <div className='flex items-center gap-3 relative'>
                      <small>Ten !</small>
                        <Button
                            text={'Đăng xuất'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                           onClick= {() => dispatch(actions.logout())}
                        />
                        
                        </div>}
                    
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        IcAfter={FiPlusCircle}
                    />
                </div>
            </div>
        </div>
  )
}

export default Header