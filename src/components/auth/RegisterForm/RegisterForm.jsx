"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Iniciando sesión con:", email, password, name)

      const res = await authClient.signUp.email({
        email,
        password,
        name,
      })
      if(res.data){
        handleLogin()
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }


  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      const res = await authClient.signIn.social({
        provider: "github",
      })
      console.log("Respuesta de inicio de sesión con Github:", res)
    } catch (error) {
      console.error("Error de inicio de sesión con Github:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await authClient.signIn.email({
        email,
        password,
      })
      console.log("Respuesta de inicio de sesión:", res)
      if (res) {
        router.push("/")
      } else {
        console.error("Error de inicio de sesión: Credenciales incorrectas")
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Nombre</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Jhon Doe"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Button variant="link" className="p-0 h-auto text-xs" type="button">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">O continúa con</span>
          </div>
        </div>
        <div className="gap-4 cursor-pointer">
          <Button onClick={handleGithubLogin} size={'lg'} variant="outline">Github</Button>
        </div>
        <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => router.push("/registro")}>
            Regístrate
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
