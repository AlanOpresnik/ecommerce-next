"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import { api } from "../../../../../../api/api"

export default function EditProductModal({ open, setOpen, product }) {
    const { handleSubmit, register, control, formState: { errors } } = useForm({
        defaultValues: {
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            featured: product.featured,
        }
    })

    const onSubmit = async (data) => {
        const res = await api.editProduct(data, product._id)

        console.log(res)
        if (!res) {
            console.error("Error al crear el producto:", res);
            alert("Error al crear el producto: " + res);
        } else {
            console.log("Producto creado:", res);
            alert("¡Producto creado exitosamente!");
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                    <DialogDescription>
                        Modifica los detalles del producto. Haz clic en guardar cuando termines.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        {product.images.map((img) => (
                            <Image alt={product.title} src={img.secure_url} width={150} height={150} />
                        ))}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input {...register('title')} defaultValue={product.title} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Precio
                        </Label>
                        <Input {...register('price')} defaultValue={product.price} type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Categoría
                        </Label>
                        <Select {...register('category')} defaultValue={product.category}>
                            <SelectTrigger className="col-span-3" id="category">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Zapatillas">Zapatilas</SelectItem>
                                <SelectItem value="electronica">Electrónica</SelectItem>
                                <SelectItem value="hogar">Hogar</SelectItem>
                                <SelectItem value="deportes">Deportes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Destacado
                        </Label>
                        <Controller
                            control={control}
                            name="featured"
                            defaultValue={product.featured}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="col-span-3" id="category">
                                        <SelectValue placeholder="Producto Destacado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Destacado</SelectItem>
                                        <SelectItem value="false">No destacado</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input {...register('stock')} defaultValue={product.stock} type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descripción
                        </Label>
                        <Textarea
                            {...register('description')}
                            defaultValue={product.description}
                            className="col-span-3 resize-none"
                            rows={3}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button >Guardar Cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
