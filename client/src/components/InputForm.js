import React, {memo} from 'react'

function InputForm({label,value,setValue,type}) {
  return (
    <div>
      <label htmlFor='phone' className='text-xs'>{label}</label>
      <input 
        id='phone' 
        type='text' 
        className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
        value={value}
        onChange={(e) => setValue(prev => ({...prev,[type]: e.target.value}))}
        />
    </div>
  )
}

export default memo(InputForm)
