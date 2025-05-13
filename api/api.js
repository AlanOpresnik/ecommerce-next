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
    },
    getProductById: async (id) => {
        try {
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/products/get/${id}`)
            if (res.status === 500) return new Error('error al obtener el producto')
            return res.data.product
        } catch (error) {
            console.log(error)
        }
    },
    postProduct: async (formData) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/products/post`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for FormData
                    },
                }
            );

            if (!res.data) {
                console.log('Error al crear el productos', res)
            }

            return res.data

        } catch (error) {
            console.error("Error en postProduct:", error);
            return { error: error.message || 'Error al crear el producto' };
        }
    },
    getUserByEmail: async (email) => {
        try {
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/users/get/${email}`)
            if (res.status === 500) return new Error('error al obtener el usuario')
            return res.data
        } catch (error) {
            console.log(error)
        }
    },
    editProduct: async (product,id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/edit/${id}`,
                product,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            if (!res.data) {
                console.log('NO HAY RESPUESTA DEL SERVIDOR')
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}