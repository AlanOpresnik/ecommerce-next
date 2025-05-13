'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const Charts = ({orders, data}) => {

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Resumen de ventas</CardTitle>
                    <CardDescription>Ventas mensuales del año actual</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false} />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`} />
                            <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Pedidos recientes</CardTitle>
                    <CardDescription>Has recibido 30 pedidos este mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {orders.slice(0, 5).map((order) => (
                            <div className="flex items-center" key={order.id}>
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{order.customer.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{order.customer}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.id} · {order.date}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">{order.total}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        Ver todos los pedidos
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Charts