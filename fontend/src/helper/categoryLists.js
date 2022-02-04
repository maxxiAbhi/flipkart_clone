const createCatogoryList = (categories, options = []) => {
    for (let mycategory of categories) {
        options.push({
            value: mycategory._id,
            name: mycategory.name,
            type: mycategory.type,
            parentId: mycategory.parentId
        })
        if (mycategory.children.length > 0) {
            createCatogoryList(mycategory.children, options)
        }
    }
    return options
}

export default createCatogoryList