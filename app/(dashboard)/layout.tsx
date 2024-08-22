import NavBar from "@/components/NavBar";



const DashBoardLayout = ({
    children
} :{ 
        children: React.ReactNode;
    }
)=>{
    return (
            <div className="h-full relative">
               <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-800">
                    <div>
                        HEllo world
                    </div>
               </div>
               <main className="md:pl-72">
                    <NavBar />
                    {children}
               </main>
            </div>
    )
}

export default DashBoardLayout