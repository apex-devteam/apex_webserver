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

export default { getMerchants }