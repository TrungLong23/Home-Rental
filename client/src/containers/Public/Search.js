import React, { useCallback, useEffect, useState } from 'react'
import { SearchItem, Modal } from '../../components'
import icons from '../../ultils/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../ultils/constant'


const {BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line,MdOutlineHouseSiding, FiSearch } = icons

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, areas, prices, categories } = useSelector(state => state.app)
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')


  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
}
  return (
    <>
      <div className='p-[10px] w-4/5 m-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2' >
            <span onClick={() => handleShowModal(categories, 'category')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text='Phòng trọ, nhà trọ'/>
            </span>
            <span onClick={() => handleShowModal(provinces, 'province')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<HiOutlineLocationMarker />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text='Toàn quốc'/>
            </span>
            <span onClick={() => handleShowModal(prices, 'price')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<TbReportMoney />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text='Chọn giá'/>
            </span>
            <span onClick={() => handleShowModal(areas, 'area')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<RiCrop2Line />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text='Chọn diện tích'/>
            </span>
        <button
        type='button'
        className='outline-none py-2 px-4 w-full flex-1 bg-secondary text-[13.3px] rounded-md flex items-center justify-center gap-2 text-white font-medium'
        > 
          <FiSearch />
          Tìm kiếm
        </button> 
      </div>
      {isShowModal &&<Modal content={content} name={name} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search
