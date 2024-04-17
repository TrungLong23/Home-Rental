import React, {memo} from 'react'

function InputForm({label}) {
  return (
    <div>
      <label htmlFor='phone' className='text-xs'>{label}</label>
      <input 
        id='phone' 
        type='text' 
        className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
        />
    </div>
  )
}

export default memo(InputForm)
