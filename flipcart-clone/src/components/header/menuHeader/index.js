import './style.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../../actions/'
import {Link} from 'react-router-dom'
export default function Categorys() {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory())
    }, [])
console.log(category)
    const renderCategories = (categories) => {
        let listCategory = [];
        for (let mycategory of categories) {
            listCategory.push(
                <li key={mycategory.name}>
                {mycategory.parentId ?<Link to={`/${mycategory.slug}?cid=${mycategory._id}&type=${mycategory.type}`}>{mycategory.name}</Link>:<span>{mycategory.name}</span>}
                    
                    {mycategory.children.length > 0 ? <ul>{renderCategories(mycategory.children)}</ul> : null}
                </li>
            );
        }
        return listCategory;
    }





    return (
        <>
        <div className="menuHeader">
            <ul>{category.categories.length > 0 ?renderCategories(category.categories):null}</ul>
        </div>
        </>
    )
}
