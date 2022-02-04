import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import SideBar from '../../container/SideBar/'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { getAllCategory, addCategory, updateCategory, deleteCategory as deleteCategoryAction } from '../../actions/'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import createCatogoryList from '../../helper/categoryLists'

export default function Categorys() {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const [cat, setCat] = useState({ name: '', parentId: '', type: '', categoryPictures: '' })
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);


    //Models

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [catUpdate, setCatUpdate] = useState(false);
    const catUpdateClose = () => setCatUpdate(false);
    const catUpdateShow = () => setCatUpdate(true);


    const [catDelete, setCatDelete] = useState(false);
    const catDeleteClose = () => setCatDelete(false);
    const catDeleteShow = () => setCatDelete(true);




    ///dispatch and call redux store

    const category = useSelector(state => state.category.categories)
    console.log(category)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const renderCategories = (categories) => {
        let listCategory = [];
        for (let mycategory of categories) {
            listCategory.push(
                {
                    label: mycategory.name,
                    value: mycategory._id,
                    children: mycategory.children.length > 0 && renderCategories(mycategory.children)
                }
                // <li key={mycategory.name}>
                //     {mycategory.name}
                //     {mycategory.children.length > 0 ? <ul>{renderCategories(mycategory.children)}</ul> : null}
                // </li>
            );
        }
        return listCategory;
    }

    // const createCatogoryList = (categories, options = []) => {
    //     for (let mycategory of categories) {
    //         options.push({ value: mycategory._id, name: mycategory.name,type:mycategory.type, parentId: mycategory.parentId })
    //         if (mycategory.children.length > 0) {
    //             createCatogoryList(mycategory.children, options)
    //         }
    //     }
    //     return options
    // }


    const updateCheckedAndExpendedCategory = () => {

        const categories = createCatogoryList(category)
        const checkedArray = [];
        const expendedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => {
                return (categoryId == category.value)
            })
            return (category && expendedArray.push(category))
        })
        setCheckedArray(checkedArray)
        setExpandedArray(expendedArray)
    }


    ///delete category

    const deleteCategory = () => {
        catDeleteShow();
        updateCheckedAndExpendedCategory()
    }

    const categoryDelete = () => {
        const checkedIdsArray = checkedArray.map((item, index) => {
            return ({ _id: item.value })
        })
        const expandedIdsArray = expandedArray.map((item, index) => {
            return ({ _id: item.value })
        })
        const idArrays = expandedIdsArray.concat(checkedIdsArray)
        if (idArrays.length > 0) {
            dispatch(deleteCategoryAction(checkedIdsArray)).then((result) => {
                if (result) {
                    dispatch(getAllCategory())
                    catDeleteClose()
                }
            })
        } else {
            console.log('array have nothing')
        }
    }




    ///update category


    const categoryUpdate = () => {
        catUpdateShow();
        updateCheckedAndExpendedCategory()
        // console.log('yeo')
        // console.log(expandedArray)
        // console.log({ checked, expanded, categories, checkedArray, expendedArray })
    }


    const handelUpdateInputs = (key, value, index, type) => {
        if (type === 'expanded') {
            const updateExpandedArray = expandedArray.map((item, _index) => {
                return (index == _index ? { ...item, [key]: value } : item)
            })
            setExpandedArray(updateExpandedArray)
        } else if (type === 'checked') {
            const updateCheckedArray = checkedArray.map((item, _index) => {
                return (index == _index ? { ...item, [key]: value } : item)
            })
            setCheckedArray(updateCheckedArray)
        }
    }

    const onUpdateCategoryFormSubmit = (e) => {
        e.preventDefault();
        const form = new FormData()
        expandedArray.forEach((item, index) => {
            form.append("_id", item.value)
            form.append("name", item.name)
            form.append("type", item.type)
            form.append("parentId", item.parentId ? item.parentId : '')

        })
        checkedArray.forEach((item, index) => {
            form.append("_id", item.value)
            form.append("name", item.name)
            form.append("type", item.type)
            form.append("parentId", item.parentId ? item.parentId : '')
        })
        // console.log(form)
        dispatch(updateCategory(form)).then(result => {
            if (result) {
                dispatch(getAllCategory())
                catUpdateClose()
            }
        })
    }




    /// Add category


    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setCat({ ...cat, [name]: value })
    }

    const handelCategoryImages = (e) => {
        console.log(e.target.files[0])
        setCat({ ...cat, categoryPictures: e.target.files[0] })
        console.log('hi')
    }

    const onCategoryFormSubmit = (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("name", cat.name)
        form.append("parentId", cat.parentId)
        form.append("type", cat.type)
        form.append("categoryPictures", cat.categoryPictures)

        dispatch(addCategory(form))

        setCat({ name: '', parentId: '', type: '', categoryPictures: '' })
        handleClose()


        // const Categorydata = {
        //     name: cat.name,
        //     parentId: cat.parentId,
        //     categoryPictures:cat.categoryPictures
        // }
        // console.log(Categorydata)
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
                    <Col md={10} className="mt-5" >
                        <Row>
                            <Col md={10}>
                                Categorys
                    </Col>
                            <Col md={2}>
                                <Button variant="primary" onClick={handleShow}>ADD CATEGORYS</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {/* <ul>
                                    {renderCategories(category)}
                                </ul> */}
                                <CheckboxTree
                                    nodes={renderCategories(category)}
                                    checked={checked}
                                    expanded={expanded}
                                    onCheck={checked => setChecked(checked)}
                                    onExpand={expanded => setExpanded(expanded)}
                                />
                                <Button variant="primary" onClick={() => deleteCategory()}>Delete Category</Button>
                                {/*  */}
                                <Button variant="primary" onClick={() => categoryUpdate()}>Updatee Catagory</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>



            {/* Add category model */}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD CATEGORYS</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={onCategoryFormSubmit}>



                        <Form.Group>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category Name" name="name" value={cat.name} onChange={handelInputs} />

                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Parent Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="parentId" value={cat.parentId} onChange={handelInputs}>
                                <option>Choose... </option>
                                {
                                    createCatogoryList(category).map((options) => <option key={options.value} value={options.value}>{options.name}</option>)
                                }

                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Type of Category Page</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="type" value={cat.type} onChange={handelInputs}>
                                <option>Choose... </option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>

                            </Form.Control>
                        </Form.Group>

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



            {/* update category model */}



            <Modal show={catUpdate} onHide={catUpdateClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE CATEGORYS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Expanded</h3>
                    <Form onSubmit={onUpdateCategoryFormSubmit}>

                        {
                            expandedArray.length > 0 &&
                            expandedArray.map((item, index) => {
                                console.log(item)
                                return (
                                    <Row key={index}>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Category Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Category Name" value={item.name} onChange={(e) => handelUpdateInputs("name", e.target.value, index, 'expanded')} />

                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>State</Form.Label>
                                                <Form.Control as="select" defaultValue="Choose..." value={item.parentId} onChange={(e) => handelUpdateInputs("parentId", e.target.value, index, 'expanded')}  >
                                                    <option>Choose... </option>
                                                    {
                                                        createCatogoryList(category).map((options) => <option key={options.value} value={options.value}>{options.name}</option>)
                                                    }

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Type</Form.Label>
                                                <Form.Control as="select" defaultValue="Choose..."  value={item.type}  onChange={(e) => handelUpdateInputs("type", e.target.value, index, 'expanded')} >
                                                    <option>Choose... </option>
                                                    <option value="store">Store</option>
                                                    <option value="product">Product</option>
                                                    <option value="page">Page</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            })
                        }


                        <h3>Checked</h3>

                        {
                            checkedArray.length > 0 &&
                            checkedArray.map((item, index) => {
                                return (
                                    <Row key={index}>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Category Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Category Name" value={item.name} onChange={(e) => handelUpdateInputs("name", e.target.value, index, 'checked')} />

                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>State</Form.Label>
                                                <Form.Control as="select" defaultValue="Choose..." value={item.parentId} onChange={(e) => handelUpdateInputs("parentId", e.target.value, index, 'checked')} >
                                                    <option>Choose... </option>
                                                    {
                                                        createCatogoryList(category).map((options) => <option key={options.value} value={options.value}>{options.name}</option>)
                                                    }

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Type</Form.Label>
                                                <Form.Control as="select" defaultValue="Choose..." value={item.type} onChange={(e) => handelUpdateInputs("type", e.target.value, index, 'checked')} > 
                                                <option>Choose... </option>
                                                    <option value="store">Store</option>
                                                    <option value="product">Product</option>
                                                    <option value="page">Page</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            })
                        }



                        {/* <Form>
                            <Form.Group>
                                <Form.File label="Select Catagory Images" name="categoryPictures" />
                            </Form.Group>
                        </Form> */}

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={catUpdateClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* update category model */}





            <Modal show={catDelete} onHide={catDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure You want to delete</Modal.Body>
                <div>
                    <h3>Expanded</h3>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) => {
                            return (<h5 key={index}>{item.name}</h5>)
                        })
                    }
                    <h3>Checked</h3>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) => {
                            return (<h5 key={index}>{item.name}</h5>)
                        })
                    }
                </div>
                <Modal.Footer>
                    <Button variant="danger" onClick={categoryDelete}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={catDeleteClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>




        </>


    )
}
