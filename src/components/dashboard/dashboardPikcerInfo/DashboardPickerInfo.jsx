import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download } from 'lucide-react'
import React from 'react'

const DashboardPickerInfo = () => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar informe
                </Button>
                <Select defaultValue="7d">
                    <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="24h">Últimas 24h</SelectItem>
                        <SelectItem value="7d">Últimos 7 días</SelectItem>
                        <SelectItem value="30d">Últimos 30 días</SelectItem>
                        <SelectItem value="90d">Últimos 90 días</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default DashboardPickerInfo