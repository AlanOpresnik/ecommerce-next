import {CardContent} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import ProductEditMenu from './ProductEditMenu'

const ProductsTable = ({ products }) => {
    return (
        <CardContent className="p-0">
            <Table> {/* <-- Agregas una tabla aquí */}
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={product.images[0].secure_url || "/placeholder.svg"}
                                        alt={product.title}
                                        className="object-cover w-10 h-10 rounded-md"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.title}</span>
                                        <span className="text-xs text-muted-foreground">{product._id}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className='flex gap-2'>
                                    <div className={`h-[22px] w-[22px] rounded-full ${product.stock <= 5 ? 'bg-red-600' : product.stock <= 10 ? 'bg-orange-500': 'bg-green-600'}`}></div>
                                    <p>
                                        {product.stock <= 5 ? 'Quedan muy pocas unidades' : product.stock <= 10 ? 'Quedan poquitas unidades' : 'Hay un buen stock'}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                ${product.price.toFixed(2)}
                            </TableCell>
                            <ProductEditMenu  product={product}/>
                        </TableRow>
                    ))}//tarea: separar en un card
                </TableBody>
            </Table>
        </CardContent>

    )
}

export default ProductsTable