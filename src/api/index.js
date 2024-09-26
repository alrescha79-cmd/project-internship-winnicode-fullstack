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

export const postData = async (url, data, token) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const deleteData = async (url, token) => {
    const response = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}