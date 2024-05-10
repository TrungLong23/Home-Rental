import React, { useState } from 'react';
import { InputReadOnly ,InputFormV2,Button} from '../../components';
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector } from 'react-redux';

const EditAccount = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const { currenData } = useSelector(state => state.user)
    console.log(currenData)
    return (
       <div className='flex flex-col h-full items-center'> 
        <h1 className='text-3xl w-full text-start font-medium py-4 border-b flex-none border-b border-gray-200'>Chỉnh sửa thông cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center flex-auto'>
            <div className='py-6 flex flex-col gap-4 w-full'>
        <InputReadOnly value={currenData?.id || ''} direction='flex-row' label='Mã thành viên'/>
        <InputReadOnly value={currenData?.phone} editPhone direction='flex-row' label='Số điện thoại'/>
        <InputFormV2 
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        direction='flex-row'
        label='Tên hiển thị' />
        <InputFormV2 
         direction='flex-row'
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label='Email' />
        <InputFormV2
         direction='flex-row'
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label='Zalo' />
        <InputFormV2
         direction='flex-row'
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label='Facebook' />
        <div className='flex'>
            <label className='w-48 flex-none' htmlFor="password">Mật khẩu</label>
            <label className='flex-auto text-blue-500 h-12 cursor-pointer'>Đổi mật khẩu</label>
        </div>
        <div className='flex mb-6'>
        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
          <img src={anonAvatar}  alt="avatar" className='w-28 h-28 rounded-full object-cover'/>
        </div>
        <Button
        text='Cập nhật'
        bgColor='bg-blue-600'
        textColor='text-white'
        />
        </div>
            </div>
        </div>
    )
}

export default EditAccount;