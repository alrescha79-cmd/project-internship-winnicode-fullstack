import axios from 'axios'

export const fetchData = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // console.log('API Response:', response)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}