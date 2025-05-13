'use client'
import { authClient, useSession } from '@/lib/auth-client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '../../../../api/api'

const UserProfile = () => {
    const { data, error } = useSession()
    const [user, setUser] = useState(null)
    const router = useRouter()



    const fetchUser = async () => {
        if (!data) return
        const user = await api.getUserByEmail(data.user?.email)
        setUser(user)
        console.log(user)
    }

    useEffect(() => {
        fetchUser()
    }, [data])


    const signOut = async () => {
        try {
            const res = await authClient.signOut()
            if (res) {
                setUser(null)
                router.push("/")
            }
            alert("Sesión cerrada")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }
    return (
        <Menu as="div" className="relative ml-3">
            <div className='flex items-center gap-4'>
                {user ? (
                    <Link href="/" className="text-sm font-medium text-white">{user.name}</Link>
                ) : (
                    <Link href="/login" className="text-sm font-medium text-white">Iniciar sesion</Link>
                )}
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                    />
                </MenuButton>
            </div>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href={user && user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        {user && user.role === 'admin' ? 'Dashboard' : 'Perfil'}
                    </a>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={signOut}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Sign out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default UserProfile