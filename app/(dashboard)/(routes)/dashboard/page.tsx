import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = ()=> {
  return ( <>
    <p className="text-gray-500 text-2xl">Hiii</p>
    <UserButton afterSignOutUrl="/" />
    <Button>Click me</Button>
    </>
  );
}
export default DashboardPage;
