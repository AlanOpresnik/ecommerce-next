import axios from "axios";

export const api = {
  getAllProducts: async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/get`
      );
      if (res.status === 500)
        return new Error("error al obtener los productos");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProductById: async (id) => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products/get/${id}`
      );
      if (res.status === 500) return new Error("error al obtener el producto");
      return res.data.product;
    } catch (error) {
      console.log(error);
    }
  },
  postProduct: async (formData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        }
      );

      if (!res.data) {
        console.log("Error al crear el productos", res);
      }

      return res.data;
    } catch (error) {
      console.error("Error en postProduct:", error);
      return { error: error.message || "Error al crear el producto" };
    }
  },
  getUserByEmail: async (email) => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/users/get/${email}`
      );
      if (res.status === 500) return new Error("error al obtener el usuario");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  editProduct: async (product, id) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/edit/${id}`,
        product,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!res.data) {
        console.log("NO HAY RESPUESTA DEL SERVIDOR");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getFavorites: async (userId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/favs/${userId}`
      );
      if (!res.data) {
        console.log("NO HAY RESPUESTA DEL SERVIDOR");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProductsInCartByIds: async (ids) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productsInCart`,
        {
          ids,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProductCart: async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/cart/delete/${id}`
      );
      if (!res) {
        console.log("error en la respuesta");
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  createPreferenceMp: async (productsArray, userName) => {
    try {
      console.log(productsArray);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/mp/crear-preferencia`,
        {
          userName,
          products: productsArray,
        }
      );
      if (!res.data) {
        console.log("error en createPreference");
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderById: async (id) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/get/${id}`
      );
      if (!res.data) {
        console.log("fallo la respuesta");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
