import Image from "next/image"
import Link from "next/link"


const Header = () => {
    return <div className="py-4 px-[120px] bg-[#FFFFFF]">
        <NavBar/>
    </div>
}

const NavBar = () => {
    return <div><Image src="./logo.svg" width={40} height={40}/>
    <Link href={`#`}>DashBoard</Link>
    <Link href={`#`}>Records</Link>
    </div>
}

export default Header