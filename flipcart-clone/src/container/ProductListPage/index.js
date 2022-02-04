import React from 'react'
import './style.css'
import MainHeader from '../../components/header/mainHeader/';
import MenuHeader from '../../components/header/menuHeader/';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import ProductPage from './ProductPage/'
import DefaultPage from './defaultPage/'

export default function ProductListPage(props) {

    const renderPage = () => {
        const params = getParams(props.location.search)
        console.log('params')
        console.log(params)
        let content = null
        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />;
                break;
            case 'page':
                console.log('page')
                content = <ProductPage {...props} />;
                break;
            default:
                console.log(props)
                console.log('default')
                content = <DefaultPage {...props} />;
                break;
        }

        return content
    }
    return (
        <>
            <MainHeader />
            <MenuHeader />
            {
                renderPage()
            }
        </>


    )
}
