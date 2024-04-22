import React, {memo} from 'react'

function InputForm({label,value,setValue,keyPayload,setInvalidFields,invalidFields, type}) {
  return (
    <div>
      <label htmlFor='phone' className='text-xs'>{label}</label>
      <input 
        id='phone' 
        type={type ||'text'}
        className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
        value={value}
        onChange={(e) => setValue(prev => ({...prev,[keyPayload]: e.target.value}))}
        onFocus={() => setInvalidFields([])}
        />
         {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className='text-red-500 italic' >{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
    </div>
  )
}

export default memo(InputForm)
