"use client"

import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import Navbar from './components/Navbar'
import { ArrowRight } from 'lucide-react'

const login = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Background */}
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover object-top -z-1"
        priority
      />

      <Navbar />

      {/* Hero Text Section */}
      <div className="flex flex-col items-center justify-center text-center gap-6 pt-62 px-4">
        <p className="text-white text-4xl font-monument">
          Learn skills that actually <br /> move you forward
        </p>

        <p className="text-white text-xs font-monument">
          Go from beginner to confident professional with guided <br />
          learning paths, hands-on practice, and measurable progress.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/?student=true" })}
          className="bg-[#E65D25] text-white font-monument px-4 py-2 rounded-full flex items-center gap-3 hover:cursor-pointer"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Image
              src="https://kalvium.community/assets/google_icon-c3f37307.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
          </div>

          <span>Continue with Google</span>

          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <ArrowRight className="text-black" />
          </div>
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="w-[80vw] mx-auto mt-40 pb-20 pointer-events-none ">
        <Image
          src="/Hero-SD.png"
          alt="Hero"
          width={1920}
          height={1080}
          className="w-full h-auto rounded-2xl"
          priority
        />
      </div>

    </div>

  )
}

export default login
