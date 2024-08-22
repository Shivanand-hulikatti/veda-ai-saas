import { Button } from "@/components/ui/button";
import Link from "next/link";

const Landing = ()=>{
    return <>
        <p>landing</p>
        <Link href={'/sign-in'}>
            <Button>
                Sign in
            </Button>
        </Link>
        <Link href={'/sign-up'}>
            <Button>
                Register
            </Button>
        </Link>
    </>
}

export default Landing;