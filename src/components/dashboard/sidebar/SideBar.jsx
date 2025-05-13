'use client'
import { Button } from '@/components/ui/button'
import { BarChart3, CreditCard, LineChart, Menu, ShoppingCart, Tag, Truck, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return (
        <div
            className={`${isSidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 hidden md:block`}>
            <div className="p-4 flex items-center justify-between">
                <Link href={'/dashboard/admin'} className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>ModaAdmin</Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white hover:bg-slate-800">
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
            <nav className="mt-6 px-2">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-slate-800">
                        <LineChart className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <Link href={'/dashboard/admin'}>Dashboard</Link>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <Tag className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <Link href={'/dashboard/products'}>Productos</Link>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <ShoppingCart className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <span>Pedidos</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <Users className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <span>Clientes</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <CreditCard className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <span>Pagos</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <Truck className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <span>Envíos</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white">
                        <BarChart3 className="h-5 w-5 mr-3" />
                        {isSidebarOpen && <span>Informes</span>}
                    </Button>
                </div>
            </nav>
        </div>
    )
}
