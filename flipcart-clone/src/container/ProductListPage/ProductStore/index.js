import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import getProductList from '../../../actions/productList.action'
import { generatePublicUrl } from '../../../urlConfig';
import {Link} from 'react-router-dom'
export default function ProductStore(props) {
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const { match } = props;
    useEffect(() => {
        dispatch(getProductList(match.params.slug))
    }, [])
    return (
        <>
            {product.products && !product.products.length ? null : Object.keys(product.productByPrice).map((key, index) => {
                return (
                    <div className="container-fluid" key={index}>
                        <div className="card">
                            <div className="card-header my-card-header">
                                <h3>{match.params.slug} Under 5K</h3><button type="button" className="btn btn-primary">Primary</button>
                            </div>

                            <div className="card-body product-container">

                                {product.productByPrice[key].map((product) =>
                                    <Link style={{display:'block'}} to={`/${product.slug}/${product._id}/p`} key={product.id} className="product-main-container">
                                        <div className="product-image-container text-center">
                                            <img src={generatePublicUrl(product.productPictures[0].img)} className="img-fluid" alt="1234" />
                                        </div>
                                        <div className="product-info">
                                            <p className="product-name">{product.name}</p>
                                            <span className="reating">3.3</span><span>3500</span>
                                            <p className="price">{product.price}</p>
                                        </div>
                                    </Link>

                                )}

                            </div>
                        </div>
                    </div>
                )
            })}


        </>


    )
}
