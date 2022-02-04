export default (query)=>{
    if(query){

        const querySplit=query.split("?")[1];
        if(querySplit.length>0){
            const params=querySplit.split("&")
            const paramsObj={}
            params.forEach(param => {
                const keyValue=param.split("=")
                paramsObj[keyValue[0]]=keyValue[1]
            });
            return paramsObj
        }
    }

    return {}
}