import { SideBar } from "@/components/dashboard/sidebar/SideBar";


export default function RootLayout({ children }) {
    return (
        <div className="flex ">
            <SideBar />
            {children}
        </div>
    );
}
