import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import SideBar from '../../container/SideBar/'
import { getAllCategory } from '../../actions/category.action'
import createCatogoryList from '../../helper/categoryLists'
import '../../App.css';
import { addPage } from '../../actions/page.action';
export default function Page() {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [categories, setCategory] = useState([])
    const [categoryImages, setCategoryImages] = useState([])
    const [bannerImages, setBannerImages] = useState([])
    const [pageForm,setPageForm]=useState({title:'',categoryId:'',discription:''})
    const [type, setType] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const category = useSelector(state => state.category.categories)

    useEffect(() => {
        dispatch(getAllCategory())
        setCategory(createCatogoryList(category))
    }, [])


    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setPageForm({ ...pageForm, [name]: value })


       if(e.target.name==='categoryId'){
        const category = categories.find(cat => cat.value === value);
        setType(category.type);
       }


    }


    const handelCategoryImages = (e) => {
        setCategoryImages([...categoryImages, e.target.files[0]]);
    }

    const handelBannerImages = (e) => {
        setBannerImages([...bannerImages, e.target.files[0]]);

    }
    
    const pageFormSubmit=(e)=>{
        e.preventDefault();
        // const user= localStorage.getItem("user");
        // const userId=JSON.parse(user)
        // console.log()
        const form = new FormData()
        form.append("type", type)
        form.append("title", pageForm.title)
        form.append("categoryId", pageForm.categoryId)
        form.append("discription", pageForm.discription)
        // form.append()
        for (let pic of categoryImages) {
            form.append("products", pic)
        }
        for (let pic of bannerImages) {
            form.append("banners", pic)
        }
        
        dispatch(addPage(form))
    }


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
                    <Col md={10}>
                        <Button variant="primary" onClick={handleShow}>
                            Create Page
                        </Button>
                    </Col>
                </Row>
            </Container>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={pageFormSubmit}>


                        <Form.Group>
                            <Form.Label>Page Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Page Title" value={pageForm.title} name="title" onChange={handelInputs} />
                        </Form.Group>



                        <Form.Group>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." value={pageForm.categoryId._id} name="categoryId" onChange={handelInputs} >
                                <option>Choose... </option>
                                {
                                    categories.map((item, index) => {
                                         return (
                                             <option key={index} value={item.value}>{item.name}</option>
                                    ) })
                                }

                            </Form.Control>

                            <Form.Group>
                                <Form.Label>Add Discription</Form.Label>
                                <Form.Control as="textarea" value={pageForm.discription} name="discription" rows={3} onChange={handelInputs} />
                            </Form.Group>


                        </Form.Group>
                        {
                            categoryImages.map((item, index) => <p key={index}>{item.name}</p>)
                        }

                        <Form.Group>
                            <Form.File label="Select Catagory Images" name="categoryImages" onChange={handelCategoryImages} />
                        </Form.Group>

                        {
                            bannerImages.map((item, index) => <p key={index}>{item.name}</p>)
                        }

                        <Form.Group>
                            <Form.File label="Select Banners Images" name="bannerImages" onChange={handelBannerImages} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
