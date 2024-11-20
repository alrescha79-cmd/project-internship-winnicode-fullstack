import axios from 'axios'

export const fetchData = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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

export const PostPhoneData = async (url, data, token) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
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

export const patchData = async (url, body, token) => {
    try {
        const response = await axios.patch(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error in patchData:', error)
        throw error
    }
}

export const putData = async (url, data, token) => {
    try {
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in putData:', error);
        throw error;
    }
};

