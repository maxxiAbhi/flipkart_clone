import React,{useState,useEffect} from 'react'
import './style.css'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../../container/SideBar/'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import Card from '../../components/UI/Card';
import { getCustomerOrders, updateOrder } from '../../actions/order.action'
export default function Orders() {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const order = useSelector((state) => state.order);
    const [type, setType] = useState("");
    console.log(auth.autenticate)
    if (!auth.autenticate) {
        history.push("/signin");
    }

    useEffect(() => {
       dispatch(getCustomerOrders())
    }, [])

    const onOrderUpdate = (orderId) => {
        const payload = {
            orderId,
            type,
        };
        dispatch(updateOrder(payload));
    };
    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10}>
                    {order.orders.map((orderItem, index) => (
                        <Card
                            style={{
                                margin: "10px 0",
                            }}
                            key={index}
                            headerLeft={orderItem._id}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "50px 50px",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <div className="title">Items</div>
                                    {orderItem.items.map((item, index) => (
                                        <div className="value" key={index}>
                                            {item.productId.name}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <span className="title">Total Price</span>
                                    <br />
                                    <span className="value">{orderItem.totalAmount}</span>
                                </div>
                                <div>
                                    <span className="title">Payment Type</span> <br />
                                    <span className="value">{orderItem.paymentType}</span>
                                </div>
                                <div>
                                    <span className="title">Payment Status</span> <br />
                                    <span className="value">{orderItem.paymentStatus}</span>
                                </div>
                            </div>
                            <div
                                style={{
                                    boxSizing: "border-box",
                                    padding: "100px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div className="orderTrack">
                                    {orderItem.orderStatus.map((status) => (
                                        <div
                                            className={`orderStatus ${status.isCompleted ? "active" : ""
                                                }`}
                                        >
                                            <div
                                                className={`point ${status.isCompleted ? "active" : ""}`}
                                            ></div>
                                            <div className="orderInfo">
                                                <div className="status">{status.type}</div>
                                                <div className="date">{formatDate(status.date)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* select input to apply order action */}
                                <div
                                    style={{
                                        padding: "0 50px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <select onChange={(e) => setType(e.target.value)}>
                                        <option value={""}>select status</option>
                                        {orderItem.orderStatus.map((status) => {
                                            return (
                                                <>
                                                    {!status.isCompleted ? (
                                                        <option key={status.type} value={status.type}>
                                                            {status.type}
                                                        </option>
                                                    ) : null}
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                                {/* button to confirm action */}

                                <div
                                    style={{
                                        padding: "0 50px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <button onClick={() => onOrderUpdate(orderItem._id)}>
                                        confirm
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}
