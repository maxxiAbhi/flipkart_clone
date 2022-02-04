import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage } from '../../../actions/productList.action';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ProductStore(props) {
    console.log('hi')
    const dispatch = useDispatch();
    const products = useSelector(state => state.product)
    const page = products.page
    const banner=page.banners
    useEffect(() => {
        const prams = getParams(props.location.search)
        const payload = {
            prams
        }
        dispatch(getPage(payload))
    }, [])
    return (
        <>
            <p>{page.title}</p>
            <Carousel renderThumbs={()=>{}}>
                {page.banners && page.banners.map((item, index) => {
                    return (
                        <a style={{display:'block'}} href={item.navigateTo} key={index}>
                            <img src={item.img} alt={index} />
                        </a>
                    )
                })}

            </Carousel>

           <div className="container-fluid">
           <div className="row">
           {page.products && page.products.map((item, index) => {
                    return (
                        <div className="col-md-4" key={index}>
                        <a  href={item.navigateTo} key={index}>
                            <img src={item.img} alt={index} className="img-fluid" />
                        </a>
                        </div>
                        
                    )
                })}
           </div>
           </div>
        </>
    )
}

export default ProductStore
