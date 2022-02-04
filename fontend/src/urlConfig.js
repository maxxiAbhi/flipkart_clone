export const api='http://localhost:8000/api'
const generatePublicUrl=(image)=>{
    return`http://localhost:8000/static/Uploads/${image}`
}