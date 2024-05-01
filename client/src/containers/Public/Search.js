import React, { useCallback, useEffect, useState } from 'react'
import { SearchItem, Modal } from '../../components'
import icons from '../../ultils/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { getCodesArea, getCodePrice } from '../../ultils/Common/getCodes'
import { getCodes,} from '../../ultils/Common/getCodes'
import * as actions from '../../store/actions'



const {BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line,MdOutlineHouseSiding, FiSearch } = icons

const Search = () => {
const dispatch = useDispatch
  const navigate = useNavigate()
  const location = useLocation()
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, areas, prices, categories } = useSelector(state => state.app)
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')
 
// console.log(getCodeArea(areas))


  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
  }
  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation()
    setQueries(prev => ({ ...prev, ...query }))
    setIsShowModal(false)
    arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
}, [isShowModal, queries])
  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObj = {}
    queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
    let titleSearch = `${queryTextObj.category
        ? queryTextObj.category
        : 'Cho thuê tất cả'} ${queryTextObj.province
            ? `tỉnh ${queryTextObj.province}`
            : ''} ${queryTextObj.price
                ? `giá ${queryTextObj.price}`
                : ''} ${queryTextObj.area
                    ? `diện tích ${queryTextObj.area}` : ''} `
    navigate({
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
    }, { state: { titleSearch } })

  }
  return (
    <>
      <div className='p-[10px] w-4/5 m-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2' >
            <span onClick={() => handleShowModal(categories, 'category')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text={queries.category} defaultText={'Tìm tất cả'}/>
            </span>
            <span onClick={() => handleShowModal(provinces, 'province')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<HiOutlineLocationMarker />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text={queries.province} defaultText={'Toàn quốc'}/>
            </span>
            <span onClick={() => handleShowModal(prices, 'price')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<TbReportMoney />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>} text={queries.price} defaultText={'Chọn giá'}/>
            </span>
            <span onClick={() => handleShowModal(areas, 'area')} className=' cursor-pointer flex-1'>
            <SearchItem IconBefore={<RiCrop2Line />}IconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>}  text={queries.area} defaultText={'Chọn diện tích'}/>
            </span>
        <button
        type='button'
        onClick={handleSearch}
        className='outline-none py-2 px-4 w-full flex-1 bg-secondary text-[13.3px] rounded-md flex items-center justify-center gap-2 text-white font-medium'
        > 
          <FiSearch />
          Tìm kiếm
        </button> 
      </div>
      {isShowModal &&<Modal handleSubmit={handleSubmit } queries={queries} arrMinMax={arrMinMax} content={content} name={name} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search
