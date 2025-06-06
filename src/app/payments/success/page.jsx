"use client";
import { CheckCircle, Download, Home, Package, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "../../../../api/api";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/formatDate";

export default function PaymentSuccessPage() {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const preferenceId = localStorage.getItem("preferenceId");

  useEffect(() => {
    const getOrder = async () => {
      const orden = await api.getOrderById(preferenceId);
      console.log(orden);
      setOrder(orden.order);
    };
    getOrder();
  }, []);

  useEffect(() => {
    if (order.products) {
      const total1 = order.products.reduce((acc, item) => {
        return acc + item.price * 1;
      }, 0);
      setTotal(total1);
    }
  }, [order]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="w-full max-w-xl">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-green-100 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-600">
            Tu transacción se ha procesado correctamente
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Detalles del Pedido</h2>
              <Receipt className="w-5 h-5 text-gray-500" />
            </div>
          </CardHeader>
          {order ? (
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Número de Pedido</span>
                <span className="text-sm font-medium">
                  #{order.mpPreferenceId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Comprador</span>
                <span className="text-sm font-medium">
                  {order.userName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fecha</span>
                <span className="font-medium">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Método de Pago</span>
                <span className="font-medium">Mercado Pago</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total Pagado</span>
                <span className="text-green-600">${total}</span>
              </div>
            </CardContent>
          ) : (
            ""
          )}
        </Card>

        {/* Confirmation Message */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="mb-1 font-medium text-blue-900">
                  Confirmación Enviada
                </h3>
                <p className="text-sm text-blue-700">
                  Hemos enviado un email de confirmación a tu dirección de
                  correo con todos los detalles de tu pedido.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex-1">
              <Package className="w-4 h-4 mr-2" />
              Ver Pedidos
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-sm text-center text-gray-500">
          <p>
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contacta soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
