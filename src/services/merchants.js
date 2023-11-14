import axios from 'axios';
const merchantUrl = "/api/merchants";

const getMerchants = async (userId) => {
    const response = await axios.get(`${merchantUrl}/${userId}`)
    console.log(response.data)
    return response.data;
}

// const showMerchants = async (userId) => {
//     console.log(userId)
//     const formatedId = {id: userId}
//     const response = await axios.get(merchantUrl, formatedId)
//     console.log(response.data)
//     return response.data
// }
export default { getMerchants }