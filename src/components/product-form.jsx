"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Upload, Check, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "../../api/api";

export default function ProductForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: '',
      category: "",
      images: [], // Importantísimo inicializar
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      console.log("Valores del formulario:", values);

      // 🔥 Convertir values a FormData
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', values.category);

      // Como values.images es un array
      values.images.forEach((file) => {
        formData.append('images', file); // El nombre 'images' es el que espera multer
      });

      const res = await api.postProduct(formData, {
        headers: { "Content-Type": "multipart/form-data" }, // 🔥 Importante
      });

      console.log(res)

      if (!res.ok === 500) {
        console.error("Error al crear el producto:", res?.error);
        alert("Error al crear el producto: " + res?.error);
      } else {
        console.log("Producto creado:", res);
        alert("¡Producto creado exitosamente!");

        setImagePreview(null);
      }
    } catch (error) {
      alert("Error: " + (error.message || "Error desconocido"));
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // 👇 Aquí seteamos en react-hook-form manualmente
      setValue("images", [file]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Producto</CardTitle>
        <CardDescription>Complete todos los campos para cargar un nuevo producto al inventario.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre del Producto</label>
            <Input placeholder="Ej: Camiseta" {...register("title", { required: "titulo requerido" })} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea placeholder="Describa el producto..." {...register("description", { required: "Descripción requerida" })} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio ($)</label>
              <Input type="number" step="0.01" {...register("price", { required: "Precio requerido" })} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoría</label>
            <Input placeholder="Ej: Zapatillas" {...register("category", { required: "Categoría requerida" })} />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Imagen del Producto</label>
            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center gap-2">
                <label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Vista previa" className="rounded-md max-h-[200px] mx-auto object-contain" />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Haga clic para subir una imagen</p>
                    </>
                  )}
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB.</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Guardar Producto
              </>
            )}
          </button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-gray-500">Todos los campos marcados son obligatorios.</p>
      </CardFooter>
    </Card>
  );
}
