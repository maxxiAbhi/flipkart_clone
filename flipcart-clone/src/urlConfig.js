export const api='http://localhost:8000/api'
export const generatePublicUrl=(image)=>{
    return`http://localhost:8000/static/Uploads/${image}`
}