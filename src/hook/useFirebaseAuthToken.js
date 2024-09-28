import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

const useFirebaseAuthToken = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchToken = async () => {
            const auth = getAuth()
            const currentUser = auth.currentUser

            if (currentUser) {
                const token = await currentUser.getIdToken()
                setUser({ token, uid: currentUser.uid, email: currentUser.email }) 
            }
        }

        fetchToken()
    }, [])

    return user
}

export default useFirebaseAuthToken