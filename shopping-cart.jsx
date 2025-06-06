"use client";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { api } from "./api/api";
import CardProduct from "@/app/order/cart/components/CardProduct";
import { useSession } from "@/lib/auth-client";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const user = useSession();
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cart);
    console.log(cartParsed);
    setCartItems(cartParsed);
    const fetchProductsInCart = async () => {
      const res = await api.getProductsInCartByIds(cartParsed);
      setProductsInCart(res);
    };
    fetchProductsInCart();
  }, []);

  useEffect(() => {
    if (productsInCart && productsInCart.length > 0) {
      const total1 = productsInCart.reduce((acc, item) => {
        return acc + item.price * 1;
      }, 0);
      setTotal(total1);
    }
  }, [productsInCart]);

  const handleCreatePreference = async () => {
    try {
      const res = await api.createPreferenceMp(
        productsInCart,
        user.data.user.name
      );
      if (res) {
        console.log(res);
        localStorage.setItem("preferenceId", res.res.preferenceId);
        localStorage.removeItem('cart')
        window.location.href = res.res.init_point
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Seguir comprando
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Carrito de Compras</h1>
            <Badge variant="secondary">{cartItems.length} productos</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {!productsInCart || productsInCart.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="w-12 h-12 mb-4 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Tu carrito está vacío
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Agrega algunos productos para comenzar
                  </p>
                  <Link href="/">
                    <Button>Explorar productos</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              productsInCart.map((prod) => (
                <div key={prod._id}>
                  <CardProduct
                    prod={prod}
                    setProductsInCart={setProductsInCart}
                  />
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Código promocional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa tu código"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Aplicar</Button>
                </div>

                <div className="mt-2 text-sm text-green-600">
                  ✓ Código aplicado
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal productos</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Ahorros</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Descuento (10%)</span>
                </div>

                <div className="flex justify-between">
                  <span>Envío</span>
                  <span></span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Envío gratis en pedidos superiores a $50
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  onClick={handleCreatePreference}
                  className="w-full"
                  size="lg"
                >
                  Proceder al pago
                </Button>
                <Button variant="outline" className="w-full">
                  Guardar para después
                </Button>
              </CardFooter>
            </Card>

            {/* Security Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 text-center">
                  <div className="text-sm font-medium">Compra 100% segura</div>
                  <div className="text-xs text-muted-foreground">
                    Tus datos están protegidos con encriptación SSL
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      SSL
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      256-bit
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Seguro
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
