import { max } from "moment"
import { getNumbersArea, getNumbersPrice } from "./getNumbers"

export const getCodePrice = (totals, min , max) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersPrice(item.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0] ,
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 9999999 : arrMaxMin[0]
    })
})
}

export const getCodeArea = (totals, min , max) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersArea(item.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0] ,
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 9999999 : arrMaxMin[0]
    })
})
}
export const getCodes = (entry, prices, min , max) => {
    const pricesWithMinMax = getCodePrice(prices, min , max)
    return pricesWithMinMax.filter(item => item.min <= entry && entry < item.max)
}
export const getCodesArea = (entry, areas, min , max) => {
    const areasWithMinMax = getCodeArea(areas , min , max)
    return areasWithMinMax.filter(item => item.min <= entry && entry < item.max)
}

// import { getNumbersArea, getNumbersPrice } from "./getNumbers"


// export const getCodePrice = (totals) => {
//     let arr = []
//     return totals?.map(item => {
//         let arrMaxMin = getNumbersPrice(item.value)
//         if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
//         let sortedArr = arr.sort()
//         return ({
//             ...item,
//             min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
//             max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
//         })
//     })
// }
// export const getCodeArea = (totals) => {
//     let arr = []
//     return totals?.map(item => {
//         let arrMaxMin = getNumbersArea(item.value)
//         if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
//         let sortedArr = arr.sort()
//         return ({
//             ...item,
//             min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
//             max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
//         })
//     })
// }

// export const getCodes = (arrMinMax, prices) => {
//     const pricesWithMinMax = getCodePrice(prices)
//     return pricesWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
// }
// export const getCodesArea = (arrMinMax, areas) => {
//     const areasWithMinMax = getCodeArea(areas)
//     return areasWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
// }