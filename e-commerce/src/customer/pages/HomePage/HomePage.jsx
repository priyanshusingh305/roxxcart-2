
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel  from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import {mens_kurta} from '../../../Data/mens_kurta'
import { useEffect } from 'react'
const HomePage = () => {
  useEffect(()=>{},[])
//   useEffect(()=>{
//     const [minPrice,maxPrice]=priceValue===null?[0,10000]:priceValue.split("-").map(Number) 
// const  data={
//   category:param.levelThree,
//   colors:colorValue || [],
//   sizes: sizeValue | [],
//   minPrice,
//   maxPrice,
//   minDiscount:discount || 0,
//   sort: sortValue || "price_low",
//   pageNumber:pageNumber,
//   pageSize:10, 
//   stock:stock
// }
// dispatch(findProducts(data))
// },[param.levelThree,
//   colorValue,
//   sizeValue,
//   priceValue,
//   discount,
//   sortValue,
//   pageNumber,
//   stock
// ])
  return (
    <div>
        
    <MainCarousel />
    <div className='space-y-10 py-20 flex flex-col justify-center  px-5 lg:px-10'>
    <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"} />
    {/* <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"} /> */}
    {/* <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shirt"}/> */}
    {/* <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Saari"} /> */}
    {/* <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Dress"}/> */}

      </div>
    </div>
  )
}

export default HomePage