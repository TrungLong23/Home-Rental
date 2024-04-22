import React ,{useState,useEffect} from 'react'
import { InputForm, Button} from '../../components'
import {useLocation,useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import {useDispatch,useSelector} from 'react-redux'
import Swal from 'sweetalert2'
const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoggedIn ,msg ,update } = useSelector(state => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayLoad] = useState({
    phone: '',
    password: '',
    name: ''
  })
  useEffect(() => {
      setIsRegister(location.state?.flag)
  },[location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate('/')
}, [isLoggedIn, navigate])

useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error')
}, [msg,update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
        phone: payload.phone,
        password: payload.password
    }
    let invalids = validate(finalPayload)
    if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
}
  const validate = (payload) => {

    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
        if (item[1] === '') {
            setInvalidFields(prev => [...prev, {
                name: item[0],
                message: 'Bạn không được bỏ trống trường này.'
            }])
            invalids++
        }
    })
    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 6) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                    }])
                    invalids++
                }
                break;
            case 'phone':
              
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Số điện thoại không hợp lệ.'
                    }])
                    invalids++
                }
                break

            default:
                break;
        }
    })
    return invalids
}
 
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md'>
      <h3 className='font-semibold text-3xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
      <div className='w-full flex flex-col gap-5'>
        {isRegister && <InputForm 
          setInvalidFields={setInvalidFields}  
          invalidFields={invalidFields} 
          label={'HỌ TÊN'} 
          value={payload.name} setValue={setPayLoad} 
          keyPayload={'name'}
          />}
        <InputForm setInvalidFields={setInvalidFields}  
          invalidFields={invalidFields} 
          label={"SỐ ĐIỆN THOẠI"} 
          value={payload.phone} 
          setValue={setPayLoad} 
          keyPayload={'phone'}
        />
        <InputForm setInvalidFields={setInvalidFields}  
          invalidFields={invalidFields} 
          label={"MẬT KHẨU"} 
          value={payload.password} 
          setValue={setPayLoad} 
          keyPayload={'password'}
          type='password'
        />
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
           onClick={() => {
            setIsRegister(false)
            setPayLoad ({
              phone: '',
              password: '',
              name: ''
            })
          }}
           className='text-blue-500 hover:underline'
           >
            Đăng nhập ngay
           </span></small>
          : <>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>

        <small 
         onClick={() => {
          setIsRegister(true)
          setPayLoad ({
            phone: '',
            password: '',
            name: ''
          })}}
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