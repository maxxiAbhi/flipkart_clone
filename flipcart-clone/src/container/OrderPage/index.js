import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions/user.action";
import MainHeader from '../../components/header/mainHeader/';
import MenuHeader from '../../components/header/menuHeader/';
import Card from "../../components/UI/Card";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../components/MaterialUi";
import { generatePublicUrl } from "../../urlConfig";



const OrderPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    console.log(user);

    return (
        <>
            <MainHeader />
            <MenuHeader />
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {user.orders.map((order) => {
                    return order.items.map((item) => (
                        <Card style={{ display: "block", margin: "5px 0" }}>
                            <Link
                                to={`/order_details/${order._id}`}
                                className="orderItemContainer"
                            >
                                <div className="orderImgContainer">
                                    <img
                                        className="orderImg"
                                        src={generatePublicUrl(item.productId.productPictures[0].img)}
                                    />
                                </div>
                                <div className="orderRow">
                                    <div className="orderName">{item.productId.name}</div>
                                    <div className="orderPrice">
                                    &#8377;
                                        {item.payablePrice}
                                    </div>
                                    <div>{order.paymentStatus}</div>
                                </div>
                            </Link>
                        </Card>
                    ));
                })}
            </div>
        </>
    );
};

export default OrderPage;