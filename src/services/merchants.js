import axios from 'axios';
const merchantUrl = "/api/merchants";

const getMerchants = async (userId) => {
    try {
        const response = await axios.get(`${merchantUrl}/${userId}`)
        if (response.data.length === 0 || !response.data) {
            throw Error("There seems to be no data associated with this!")
        }
        return response.data;
    } catch (error) {
        console.error("Error getting Merchants:", error)
        throw error
    }
}

const linkMerchantWithUser = async (data) => {
    try {
        const response = await axios.post(`${merchantUrl}/link-with-user`, data)
        return response
    } catch(error) {
        //DUPLICATE DATA
        if (error.response.status === 409) {
            console.error(error)
            return error.response.status
        }
    }
}

export default { getMerchants, linkMerchantWithUser }