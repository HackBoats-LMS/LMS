import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
const Navbar = () => {
    const router = useRouter()
    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:px-16 lg:px-24">
            <div className="text-white text-2xl font-bold tracking-wider">
                <Image
                    src={"/logo.png"}
                    alt="Logo"
                    width={170}
                    height={170}
                    className='w-44 h-auto pt-4'
                />
            </div>
            <button className="bg-[#E65D25] text-white font-monument px-3 py-2 rounded-full font-medium flex justify-center items-center gap-2 cursor-pointer hover:bg-[#d5521f] transition-all active:scale-95"
                onClick={() => signIn("google", { callbackUrl: "/?student=true" })}
            >
                <span className='px-3'>Login</span>
                <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
                    <ArrowRight className='text-black' />
                </div>
            </button>
        </nav>
    )
}

export default Navbar