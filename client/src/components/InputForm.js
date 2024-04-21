import React, {memo} from 'react'

function InputForm({label,value,setValue,type,setInvalidFields,invalidFields}) {
  return (
    <div>
      <label htmlFor='phone' className='text-xs'>{label}</label>
      <input 
        id='phone' 
        type='text' 
        className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
        value={value}
        onChange={(e) => setValue(prev => ({...prev,[type]: e.target.value}))}
        onFocus={() => setInvalidFields([])}
        />
         {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='text-red-500 italic' >{invalidFields.find(i => i.name === type)?.message}</small>}
    </div>
  )
}

export default memo(InputForm)
