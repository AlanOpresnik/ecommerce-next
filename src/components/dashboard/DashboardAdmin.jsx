"use client"

import {
  Calendar,
  Package,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SideBar } from "./sidebar/SideBar"
import AdminHeader from "./adminHeader/AdminHeader"
import DashboardPickerInfo from "./dashboardPikcerInfo/DashboardPickerInfo"
import Stats from "./Stats/Stats"
import Charts from "./charts/Charts"

// Datos de ejemplo para el gráfico
const data = [
  { name: "Ene", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Abr", total: 4000 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 5000 },
  { name: "Jul", total: 4800 },
]

// Datos de ejemplo para la tabla de pedidos
const orders = [
  {
    id: "ORD-001",
    customer: "María García",
    status: "Completado",
    date: "12 May 2023",
    total: "$245.99",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Carlos Rodríguez",
    status: "Procesando",
    date: "11 May 2023",
    total: "$129.50",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Ana Martínez",
    status: "Enviado",
    date: "10 May 2023",
    total: "$89.99",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Juan López",
    status: "Pendiente",
    date: "09 May 2023",
    total: "$312.75",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Laura Sánchez",
    status: "Completado",
    date: "08 May 2023",
    total: "$175.25",
    items: 2,
  },
]

// Datos de ejemplo para productos populares
const popularProducts = [
  {
    id: "PROD-001",
    name: "Camiseta Premium",
    category: "Camisetas",
    stock: 45,
    price: "$29.99",
    sales: 128,
  },
  {
    id: "PROD-002",
    name: "Jeans Slim Fit",
    category: "Pantalones",
    stock: 32,
    price: "$59.99",
    sales: 96,
  },
  {
    id: "PROD-003",
    name: "Vestido Elegante",
    category: "Vestidos",
    stock: 18,
    price: "$79.99",
    sales: 87,
  },
  {
    id: "PROD-004",
    name: "Chaqueta de Cuero",
    category: "Abrigos",
    stock: 12,
    price: "$149.99",
    sales: 64,
  },
]

export default function DashboardAdmin() {

  return (
    <div className="w-[88vw] bg-background">
      <div className=" ">
        <AdminHeader />
        {/* Contenido del dashboard */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <DashboardPickerInfo />

          {/* Tarjetas de estadísticas */}
          <Stats />

          {/* Gráfico y pedidos recientes */}
          <Charts orders={orders} data={data} />

          {/* Tabs para pedidos y productos */}
          <Tabs defaultValue="orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="orders">Pedidos recientes</TabsTrigger>
              <TabsTrigger value="products">Productos populares</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos recientes</CardTitle>
                  <CardDescription>Gestiona tus pedidos recientes y su estado</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Artículos</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completado"
                                  ? "default"
                                  : order.status === "Procesando"
                                    ? "secondary"
                                    : order.status === "Enviado"
                                      ? "outline"
                                      : "destructive"
                              }>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Abrir menú</span>
                                  <span className="text-xs">···</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                <DropdownMenuItem>Actualizar estado</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Cancelar pedido</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">Página 1 de 10</div>
                  <Button variant="outline" size="sm">
                    Siguiente
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Productos populares</CardTitle>
                  <CardDescription>Los productos más vendidos en tu tienda</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Ventas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {popularProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Abrir menú</span>
                                  <span className="text-xs">···</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Editar producto</DropdownMenuItem>
                                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Eliminar producto</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todos los productos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Calendario y actividad reciente */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Calendario de envíos</CardTitle>
                <CardDescription>Programa de envíos para los próximos días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[350px] border rounded-md">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Calendario de envíos</h3>
                    <p className="text-sm text-muted-foreground">
                      Aquí se mostrará el calendario de envíos programados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
                <CardDescription>Actividad de la tienda en las últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                      <ShoppingCart className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Nuevo pedido #ORD-001</p>
                      <p className="text-sm text-muted-foreground">María García ha realizado un pedido de $245.99</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">Hace 5m</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                      <Users className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Nuevo cliente registrado</p>
                      <p className="text-sm text-muted-foreground">Juan López se ha registrado en la tienda</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">Hace 1h</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
                      <Package className="h-5 w-5 text-yellow-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Producto agotado</p>
                      <p className="text-sm text-muted-foreground">Chaqueta de Cuero se ha agotado en el inventario</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">Hace 3h</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
                      <Truck className="h-5 w-5 text-purple-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Pedido enviado</p>
                      <p className="text-sm text-muted-foreground">El pedido #ORD-003 ha sido enviado a Ana Martínez</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">Hace 5h</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver toda la actividad
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
