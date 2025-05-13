'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const FilterTabs = () => {
    return (
        <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="in-stock">En stock</TabsTrigger>
                <TabsTrigger value="out-of-stock">Agotados</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default FilterTabs