import { categotyConstants } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                // type: category.type,
                children: []
            };
            console.log(newCategory)
            myCategories.push({
               
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            console.log("else")
            console.log(cat.children)
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }
    return myCategories;
}

export default (state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case categotyConstants.CATEGORY_REQUEST:state={
            ...state,
            loading:true
        }
        break;
        case categotyConstants.CATEGORY_SUCESS:state={
            ...state,
            categories:action.payload.category,
            loading:false
        }
        break;
        case categotyConstants.ADD_CATEGORY_REQUEST:state={
            ...state,
            loading:true
        }
        break;
        case categotyConstants.ADD_CATEGORY_SUCESS:
            const category = action.payload.category;
            console.log(state);
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log('updated categoires', updatedCategories);
        state={
            ...state,
            categories:updatedCategories,
            loading:false
        }
        break;
        case categotyConstants.ADD_CATEGORY_FAILURE:state={
           ...initState
        }
        break;
    }
    return state;
}