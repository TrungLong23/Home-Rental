import React from 'react'
import { InputForm, Button} from '../../components'

function Login() {
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md'>
      <h3 className='font-semibold text-3xl mb-3'>Đăng nhập</h3>
      <div className='w-full flex flex-col gap-4'>
        <InputForm label={"SỐ ĐIỆN THOẠI"}/>
        <InputForm label={"MẬT KHẨU"}/>
        <Button
          text='Đăng Nhập'
          bgColor='bg-secondary'
          textColor='text-white'
          fullWidth
          />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoản mới</small>
      </div>
    </div>
  )
}

export default Login
