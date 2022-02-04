import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Table, Alert } from 'react-bootstrap'
import SideBar from '../../container/SideBar/'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { getAllCategory, getAllProducts } from '../../actions';
import { addProduct } from '../../actions/products.action';
export default function Products() {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    console.log(auth.autenticate)


    //modele for add product
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //modele for update product
    const [productUpdateShow, setProductUpdateShow] = useState(false);
    const handleCloseProductUpdate = () => setProductUpdateShow(false);
    const handleModeProductUpdate = () => setProductUpdateShow(true);

    const [sentProductUpdateToModel, setSentProductUpdateToModel] = useState(null);
    const handelSingleProductForUpdateModel = (products) => {
        setSentProductUpdateToModel(products)
        handleModeProductUpdate()
    }


    //modele for product details
    const [productDetailsShow, setProductDetailsShow] = useState(false);
    const handleCloseProductDetails = () => setProductDetailsShow(false);
    const handleModeProductDetails = () => setProductDetailsShow(true);

    const [sentProductDetailsToModel, setSentProductDetailsToModel] = useState(null);
    const handelSingleProductForModel = (products) => {
        setSentProductDetailsToModel(products)
        handleModeProductDetails()
    }


    ///get category and product data from redux store
    const category = useSelector(state => state.category.categories)
    const getmyAllProducts = useSelector(state => state.initdata.products)
    const sucessaddProductMessage = useSelector(state => state.addproduct.sucessMessage)
    var erroraddProductMessage = useSelector(state => state.addproduct.errorMessage)
    // console.log(addProductMessage)





    const createCatogoryList = (categories, options = []) => {
        for (let mycategory of categories) {
            options.push({ value: mycategory._id, name: mycategory.name })
            if (mycategory.children.length > 0) {
                createCatogoryList(mycategory.children, options)
            }
        }
        return options
    }




    const [product, setProduct] = useState({ name: '', price: '', quantity: '', discription: '', category: '' })
    const [productImages, setProductImages] = useState([])


    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setProduct({ ...product, [name]: value })
    }


    const handelCategoryImages = (e) => {
        setProductImages([...productImages, e.target.files[0]]);
    }


    const onCategoryFormSubmit = (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("name", product.name)
        form.append("price", product.price)
        form.append("quantity", product.quantity)
        form.append("discription", product.discription)
        form.append("category", product.category)
        for (let pic of productImages) {
            form.append("productPictures", pic)
        }


        dispatch(addProduct(form))

        // handleClose()
    }
    // if(erroraddProductMessage.length>0){
    //     setProduct({ name: '', price: '', quantity: '', discription: '', category: '' })
    // }
    if (sucessaddProductMessage.length > 0) {
        erroraddProductMessage = '';
        setProduct({ name: '', price: '', quantity: '', discription: '', category: '' })
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory())
        dispatch(getAllProducts())
    }, [])

    if (!auth.autenticate) {
        history.push("/signin");
    }
    return (
        <>
            <Container fluid>

                <Row>
                    <Col md={2}>
                        <SideBar />
                    </Col>
                    <Col md={10} className="mt-5" >

                        <Row>
                            <Col md={10}>
                                PRODUCTS
                </Col>
                            <Col md={2}>
                                <Button variant="primary" onClick={handleShow} >ADD PRODUCTS</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Table responsive striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Category</th>
                                            <th>Edit</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getmyAllProducts.map((products) => {
                                            return (
                                                <tr key={products._id}>
                                                    <td onClick={() => handelSingleProductForModel(products)}>{products.name}</td>
                                                    <td onClick={() => handelSingleProductForModel(products)}>{products.price}</td>
                                                    <td onClick={() => handelSingleProductForModel(products)}>{products.quantity}</td>
                                                    <td onClick={() => handelSingleProductForModel(products)}>{products.category.name}</td>
                                                    <td onClick={() => handelSingleProductForUpdateModel(products)}><a ><i class="fa fa-edit"></i></a></td>
                                                    <td><i class="fa fa-trash" aria-hidden="true"></i></td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>



            {/* model add products */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD CATEGORYS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            {sucessaddProductMessage.length > 0 ? <div class="alert alert-success" role="alert">
                                {sucessaddProductMessage}
                            </div> : null}

                            {erroraddProductMessage.length > 0 ? <div class="alert alert-danger" role="alert">
                                {erroraddProductMessage}
                            </div> : null}

                        </Col>
                    </Row>
                    <Form onSubmit={onCategoryFormSubmit}>


                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category Name" name="name" value={product.name} onChange={handelInputs} />

                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Category Name" name="price" value={product.price} onChange={handelInputs} />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter Category Name" name="quantity" value={product.quantity} onChange={handelInputs} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Add Discription</Form.Label>
                            <Form.Control as="textarea" value={product.discription} name="discription" rows={3} onChange={handelInputs} />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="category" value={product.category} onChange={handelInputs}  >
                                <option>Choose... </option>
                                {
                                    createCatogoryList(category).map((options) => <option key={options.value} value={options.value}>{options.name}</option>)
                                }

                            </Form.Control>
                        </Form.Group>

                        {productImages.map((image) => <div key={image.lastModified + image.size}>{image.name}</div>)}

                        <Form>
                            <Form.Group>
                                <Form.File label="Select Catagory Images" name="categoryPictures" onChange={handelCategoryImages} />
                            </Form.Group>
                        </Form>


                        <Button variant="primary" type="submit">Submit</Button>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>



            {/*model update products */}


            <Modal show={productUpdateShow} onHide={handleCloseProductUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            Name:{sentProductUpdateToModel != null ? sentProductUpdateToModel.name : null}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProductUpdate}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>



            {/* model products details */}


            <Modal size="lg" show={productDetailsShow} onHide={handleCloseProductDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Products Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label>Name</label>
                            <div>{sentProductDetailsToModel != null ? sentProductDetailsToModel.name : null}</div>
                        </Col>
                        <Col md="6">
                            <label>Price</label>
                            <div>{sentProductDetailsToModel != null ? sentProductDetailsToModel.price : null}</div>
                        </Col>
                        <Col md="6">
                            <label>Slug</label>
                            <div>{sentProductDetailsToModel != null ? sentProductDetailsToModel.slug : null}</div>
                        </Col>
                        <Col md="6">
                            <label>Catagory</label>
                            <div>{sentProductDetailsToModel != null ? sentProductDetailsToModel.category.name : null}  </div>
                        </Col>
                        <Col md="12">
                            <label>Discription</label>
                            <div>{sentProductDetailsToModel != null ? sentProductDetailsToModel.discription : null}  </div>
                        </Col>
                        <Col md="12" >
                            <label>Product Images</label>
                            <div style={{ display: 'flex' }}>
                                {
                                    sentProductDetailsToModel != null ? sentProductDetailsToModel.productPictures.map((images) => {
                                        return (
                                            <div className="product-image-container">
                                                <img className="img-fluid" src={`http://localhost:8000/static/Uploads/${images.img}`}></img>
                                            </div>
                                        )
                                    }) : null}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProductDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}
