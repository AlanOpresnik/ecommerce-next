import axios from "axios"

export const api = {
    getAllProducts: async () => {
        try {
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/products/get`)
            if (res.status === 500) return new Error('error al obtener los productos')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}