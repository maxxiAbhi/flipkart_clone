import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductListDefault } from '../../../actions/productList.action'
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom'
export default function DefaultPage(props) {
    const product = useSelector((state) => state.product);
    const myProduct = product.products
    console.log(myProduct)
    const dispatch = useDispatch();
    const { match } = props;
    useEffect(() => {
        dispatch(getProductListDefault(match.params.slug))
    }, [])
    return (
        <>

            <div className="container" >
                <div className="row">
                {product.products.map((product, index) =>
                    <div key={product.id} className="col-md-4">
                        <div class="card" style={{ width: "18rem;" }}>
                            <Link to={`/${product.slug}/${product._id}/p`}  >
                                <div className="text-center">
                                    <img src={generatePublicUrl(product.productPictures[0].img)} className="img-fluid" alt="1234" />
                                </div>
                                <div className="product-info">
                                    <p className="product-name">{product.name}</p>
                                    <span className="reating">3.3</span><span>3500</span>
                                    <p className="price">{product.price}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                )}
                </div>
            </div>


        </>


    )
}