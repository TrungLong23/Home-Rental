import React ,{useState,useEffect} from 'react'
import { InputForm, Button} from '../../components'
import {useLocation } from 'react-router-dom'
import * as actions from '../../store/actions'
import {useDispatch} from 'react-redux'
const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [payload, setPayLoad] = useState({
    phone: '',
    password: '',
    name: ''
  })
  useEffect(() => {
      setIsRegister(location.state?.flag)
  },[location.state?.flag])

  const handleSubmit = async () => {
    console.log(payload)
    isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
  }
 
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md'>
      <h3 className='font-semibold text-3xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
      <div className='w-full flex flex-col gap-5'>
        {isRegister && <InputForm label={'HỌ TÊN'} value={payload.name} setValue={setPayLoad} type={'name'}/>}
        <InputForm label={"SỐ ĐIỆN THOẠI"} value={payload.phone} setValue={setPayLoad} type={'phone'}/>
        <InputForm label={"MẬT KHẨU"} value={payload.password} setValue={setPayLoad} type={'password'}/>
        <Button
          text={isRegister ? 'Đăng kí' :'Đăng nhập'}
          bgColor='bg-secondary'
          textColor='text-white'
          fullWidth
          onClick={handleSubmit}
          />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        {isRegister 
          ? <small>Bạn đã có tài khoản?<span
           onClick={() => {setIsRegister(false)}}
           className='text-blue-500 hover:underline'
           >
            Đăng nhập ngay
           </span></small>
          : <>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>

        <small 
         onClick={() => {setIsRegister(true)}}
        className='text-[blue] hover:text-[red] cursor-pointer'
        >
          Tạo tài khoản mới
        </small>
        </>}
      </div>
    </div>
  )
}

export default Login