import moment from "moment"

const formatDate = (dateObj) => {
    let day = dateObj.getDay() === 0 ? 'Chủ nhật': `Thứ ${dateObj.getDay() + 1}`
    let date = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
    let time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    return  `${day}, ${time} ${date}`
}
const generateDate = () => {
    let gapExpire = Math.floor(Math.random() * 29) + 1
    let today = new Date()
    let expireDay = moment(today).add(gapExpire, 'd').toDate()
    return {
        today: formatDate(today),
        expireDay: formatDate(expireDay)            
    }
}


export default generateDate