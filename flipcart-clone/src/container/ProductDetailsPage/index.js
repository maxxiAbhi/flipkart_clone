import './style.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../actions/productDetails.actions'
import MainHeadere from '../../components/header/mainHeader'
import MenuHeader from '../../components/header/menuHeader'
import { AiFillThunderbolt } from 'react-icons/ai';
import { generatePublicUrl } from '../../urlConfig'
import {MaterialButton} from '../../components/MaterialUi';
import {addToCart} from '../../actions/cart.action';
import { 
  IoIosArrowForward, 
  IoIosStar, 
  IoMdCart 
} from 'react-icons/io';
import { useHistory } from 'react-router-dom'
function ProductDetailsPage(props) {
  const history=useHistory()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  console.log(productDetails.product)
  // console.log(productDetails.product.productPictures.length)
 
  useEffect(() => {
    dispatch(getProductById(props.match.params))
  }, [])

  return (
    <>
      <MainHeadere />
      <MenuHeader />
     {/* <section style={{backgroundColor:'#F1F3F6'}}>
     <div className="container" style={{backgroundColor:'#fff'}}>
       <div className="row product-details">
         <div className="col-md-5"></div>
         <div className="col-md-7">
           <h3 className='product-name'>{productDetails.product.name}</h3>
          <div className='product-reating'> <h5 ><p>4.5 <span><FaStar /></span></p> </h5></div>
           <h4 className='product-price'>&#x20B9; {productDetails.product.price}</h4>
         </div>
       </div>
      </div>
     </section> */}



     <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {productDetails.product.productPictures && productDetails.product.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={productDetails.product.productPictures && generatePublicUrl(productDetails.product.productPictures[0].img)}
                alt={`${ productDetails.product.productPictures && productDetails.product.productPictures[0].img}`}
              />
            </div>

            
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                onClick={()=>{
                  const {_id,name,price}=productDetails.product;
                  const img=productDetails.product.productPictures && productDetails.product.productPictures[0].img;
                  dispatch(addToCart({_id,name,price,img}))
                  history.push('/cart')
                }}
                icon={<IoMdCart />}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{productDetails.product.name}</a>
              </li>
            </ul>
          </div>
       
          <div className="productDetails">
            <p className="productTitle">{productDetails.product.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra &#x20B9;
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
              &#x20B9;
                {productDetails.product.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
           
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {productDetails.product.discription}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default ProductDetailsPage
