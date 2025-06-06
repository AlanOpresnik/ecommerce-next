"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { ChevronDown, Edit, Eye } from "lucide-react";
import React, { useState } from "react";
import EditProductModal from "./EditProductModal/EditProductModal";
import ProductModalPreview from "./ProductModalPreview/ProductModalPreview";

const ProductEditMenu = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <TableCell className="text-right">
      <div className="flex justify-end gap-2">
        <Button onClick={() => setOpen(!open)} variant="ghost" size="icon">
          <Edit className="w-4 h-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button
          onClick={() => setOpenPreview(!openPreview)}
          variant="ghost"
          size="icon"
        >
          <Eye className="w-4 h-4" />
          <span className="sr-only">Ver</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronDown className="w-4 h-4" />
              <span className="sr-only">Más opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuItem>Cambiar categoría</DropdownMenuItem>
            <DropdownMenuItem>Marcar como destacado</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditProductModal open={open} setOpen={setOpen} product={product} />
      <ProductModalPreview
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        product={product}
      />
    </TableCell>
  );
};

export default ProductEditMenu;
