'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../../../api/api'

const UploadProductForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: "",
            category: "",
            stock: 0,
            featured: false,
            images: []
        }
    })

    const onSubmit = async (data) => {
        console.log(data)

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('stock', data.stock);
        formData.append('featured', data.featured)

        // Adjuntar todas las imágenes
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);  // OJO: mismo nombre 'images'
            }
        }


        const res = await api.postProduct(formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(res)
        if (res.status === 500) {
            console.error("Error al crear el producto:", res?.error);
            alert("Error al crear el producto: " + res?.error);
        } else {
            console.log("Producto creado:", res);
            alert("¡Producto creado exitosamente!");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                    <input
                        type="text"
                        {...register("title", {
                            required: true,
                            minLength: {
                                value: 0,
                                message: 'Debe tener al menos 1 caracter'
                            }
                        })}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Ejemplo: Pala de pádel Pro"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                        {...register('category')}
                        className="w-full rounded-md border border-gray-300 p-2 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="palas">Palas</option>
                        <option value="indumentaria">Indumentaria</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="number"
                        {...register('price')}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        {...register('stock')}
                        name="stock"
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen del producto</label>
                <input
                    type="file"
                    multiple
                    {...register('images')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                    {...register('description', {
                        required:true,
                    })}
                    rows="4"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Escribe una descripción detallada..."
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Guardar producto
                </button>
            </div>
        </form>
    )
}

export default UploadProductForm