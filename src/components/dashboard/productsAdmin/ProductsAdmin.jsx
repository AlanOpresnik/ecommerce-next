"use client"

import { useState } from "react"
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  Download,
  Edit,
  Eye,
  Filter,
  LineChart,
  Menu,
  Plus,
  Search,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  Users,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para productos
const products = [
  {
    id: "PROD-001",
    name: "Camiseta Premium",
    image: "/placeholder.svg?height=40&width=40",
    category: "Camisetas",
    description: "Camiseta de algodón premium con diseño exclusivo",
    price: 29.99,
    stock: 45,
    status: "En stock",
    featured: true,
    createdAt: "12 May 2023",
  },
  {
    id: "PROD-002",
    name: "Jeans Slim Fit",
    image: "/placeholder.svg?height=40&width=40",
    category: "Pantalones",
    description: "Jeans de corte slim con acabado premium",
    price: 59.99,
    stock: 32,
    status: "En stock",
    featured: true,
    createdAt: "10 May 2023",
  },
  {
    id: "PROD-003",
    name: "Vestido Elegante",
    image: "/placeholder.svg?height=40&width=40",
    category: "Vestidos",
    description: "Vestido elegante para ocasiones especiales",
    price: 79.99,
    stock: 18,
    status: "En stock",
    featured: true,
    createdAt: "08 May 2023",
  },
  {
    id: "PROD-004",
    name: "Chaqueta de Cuero",
    image: "/placeholder.svg?height=40&width=40",
    category: "Abrigos",
    description: "Chaqueta de cuero genuino con forro interior",
    price: 149.99,
    stock: 12,
    status: "Pocas unidades",
    featured: false,
    createdAt: "05 May 2023",
  },
  {
    id: "PROD-005",
    name: "Zapatos Casuales",
    image: "/placeholder.svg?height=40&width=40",
    category: "Calzado",
    description: "Zapatos casuales cómodos para uso diario",
    price: 69.99,
    stock: 28,
    status: "En stock",
    featured: false,
    createdAt: "03 May 2023",
  },
  {
    id: "PROD-006",
    name: "Bufanda de Lana",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accesorios",
    description: "Bufanda de lana suave y cálida",
    price: 24.99,
    stock: 35,
    status: "En stock",
    featured: false,
    createdAt: "01 May 2023",
  },
  {
    id: "PROD-007",
    name: "Gorra Deportiva",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accesorios",
    description: "Gorra deportiva ajustable con logo bordado",
    price: 19.99,
    stock: 50,
    status: "En stock",
    featured: false,
    createdAt: "28 Abr 2023",
  },
  {
    id: "PROD-008",
    name: "Sudadera con Capucha",
    image: "/placeholder.svg?height=40&width=40",
    category: "Sudaderas",
    description: "Sudadera con capucha y bolsillo canguro",
    price: 49.99,
    stock: 0,
    status: "Agotado",
    featured: false,
    createdAt: "25 Abr 2023",
  },
  {
    id: "PROD-009",
    name: "Falda Plisada",
    image: "/placeholder.svg?height=40&width=40",
    category: "Faldas",
    description: "Falda plisada de longitud media",
    price: 39.99,
    stock: 22,
    status: "En stock",
    featured: false,
    createdAt: "22 Abr 2023",
  },
  {
    id: "PROD-010",
    name: "Camisa Formal",
    image: "/placeholder.svg?height=40&width=40",
    category: "Camisas",
    description: "Camisa formal de manga larga con botones",
    price: 54.99,
    stock: 5,
    status: "Pocas unidades",
    featured: false,
    createdAt: "20 Abr 2023",
  },
]

// Categorías para filtros
const categories = [
  "Todas",
  "Camisetas",
  "Pantalones",
  "Vestidos",
  "Abrigos",
  "Calzado",
  "Accesorios",
  "Sudaderas",
  "Faldas",
  "Camisas",
]

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Todas")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "Todas" || product.category === categoryFilter

    const matchesStatus =
      statusFilter === "Todos" ||
      (statusFilter === "En stock" && product.status === "En stock") ||
      (statusFilter === "Pocas unidades" && product.status === "Pocas unidades") ||
      (statusFilter === "Agotado" && product.status === "Agotado")

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Manejar selección de productos
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Seleccionar/deseleccionar todos
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Manejar edición de producto
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsAddProductOpen(true)
  }

  // Resetear formulario
  const resetForm = () => {
    setEditingProduct(null)
    setIsAddProductOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 hidden md:block`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>ModaAdmin</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-6 px-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <LineChart className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
              <Tag className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Productos</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <ShoppingCart className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Pedidos</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <Users className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Clientes</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <CreditCard className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Pagos</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <Truck className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Envíos</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
              <BarChart3 className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Informes</span>}
            </Button>
          </div>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-8 md:w-[300px] bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Contenido de la página de productos */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
              <p className="text-muted-foreground">Gestiona el inventario y los productos de tu tienda</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filtrar productos</SheetTitle>
                    <SheetDescription>Ajusta los filtros para encontrar productos específicos</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Estado</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Todos">Todos</SelectItem>
                          <SelectItem value="En stock">En stock</SelectItem>
                          <SelectItem value="Pocas unidades">Pocas unidades</SelectItem>
                          <SelectItem value="Agotado">Agotado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price-range">Rango de precio</Label>
                      <div className="flex items-center gap-2">
                        <Input id="min-price" type="number" placeholder="Min" className="h-8" />
                        <span>-</span>
                        <Input id="max-price" type="number" placeholder="Max" className="h-8" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">Solo productos destacados</Label>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCategoryFilter("Todas")
                        setStatusFilter("Todos")
                        setIsFilterOpen(false)
                      }}
                    >
                      Restablecer
                    </Button>
                    <SheetClose asChild>
                      <Button>Aplicar filtros</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Editar producto" : "Añadir nuevo producto"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct
                        ? "Modifica los detalles del producto existente"
                        : "Completa los detalles para añadir un nuevo producto a tu inventario"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-id">ID del producto</Label>
                        <Input
                          id="product-id"
                          defaultValue={editingProduct?.id || "PROD-"}
                          disabled={!!editingProduct}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-category">Categoría</Label>
                        <Select defaultValue={editingProduct?.category || ""}>
                          <SelectTrigger id="product-category">
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories
                              .filter((c) => c !== "Todas")
                              .map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Nombre del producto</Label>
                      <Input id="product-name" defaultValue={editingProduct?.name || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-description">Descripción</Label>
                      <Textarea id="product-description" defaultValue={editingProduct?.description || ""} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-price">Precio ($)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          defaultValue={editingProduct?.price || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-stock">Stock</Label>
                        <Input id="product-stock" type="number" defaultValue={editingProduct?.stock || ""} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-image">Imagen del producto</Label>
                      <div className="flex items-center gap-4">
                        {editingProduct && (
                          <img
                            src={editingProduct.image || "/placeholder.svg"}
                            alt={editingProduct.name}
                            className="h-16 w-16 rounded-md object-cover border"
                          />
                        )}
                        <Input id="product-image" type="file" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="product-featured" defaultChecked={editingProduct?.featured || false} />
                      <Label htmlFor="product-featured">Producto destacado</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit">{editingProduct ? "Guardar cambios" : "Añadir producto"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Acciones para productos seleccionados */}
          {selectedProducts.length > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{selectedProducts.length} productos seleccionados</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProducts([])}>
                  <X className="h-4 w-4 mr-1" />
                  Limpiar selección
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Tag className="h-4 w-4 mr-2" />
                  Cambiar categoría
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar seleccionados
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar seleccionados
                </Button>
              </div>
            </div>
          )}

          {/* Tabla de productos */}
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Inventario de productos</CardTitle>
                  <CardDescription>{filteredProducts.length} productos encontrados</CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="in-stock">En stock</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Agotados</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Seleccionar todos"
                      />
                    </TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="hidden md:table-cell">Stock</TableHead>
                    <TableHead className="hidden md:table-cell">Estado</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No se encontraron productos
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                            aria-label={`Seleccionar ${product.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-xs text-muted-foreground">{product.id}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              product.status === "En stock"
                                ? "default"
                                : product.status === "Pocas unidades"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ChevronDown className="h-4 w-4" />
                                  <span className="sr-only">Más opciones</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicar</DropdownMenuItem>
                                <DropdownMenuItem>Cambiar categoría</DropdownMenuItem>
                                <DropdownMenuItem>Marcar como destacado</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
