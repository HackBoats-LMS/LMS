"use client"

import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import ShinyText from '../../components/ShinyText'
import CountUp from '../../components/CountUp'
import Noise from '../../components/Noise'

const login = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans text-[#1A1A1A] selection:bg-[#E6F0FF] overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full py-6 px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Custom Logo: Purple circle, yellow circle, purple pill */}
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-[#5D3FD3]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFD600]"></div>
              </div>
              <div className="w-[26px] h-2.5 rounded-full bg-[#5D3FD3]"></div>
            </div>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black leading-none tracking-tight">HACK</span>
            <span className="text-xl font-black leading-none tracking-tight text-[#FFD600]">BOATS</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-tight text-gray-800">
          <a href="#" className="border-b-2 border-[#FFD600] pb-0.5">Course</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Admission</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Financial Aid</a>
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Blog</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="font-bold text-sm px-4">Login</button>
          <button className="bg-[#1A1A1A] text-white px-7 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-transform active:scale-95">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full flex flex-col items-center pt-8 pb-0">
        <div className="relative w-full max-w-6xl px-6 text-center">
          {/* Header Typography with Custom Glyphs */}
          <div className="flex flex-col items-center select-none">
            {/* Top Row: FIND YOUR BEST */}
            <div className="relative flex items-center gap-3 md:gap-5">
              {/* Floating Book Icon from Uploads */}
              <div className="absolute -left-16 md:-left-28 -top-10 md:-top-16">
                <div className="w-16 md:w-24 h-16 md:h-24 bg-[#BFAFFF] rounded-2xl border-[3px] border-black flex items-center justify-center -rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img src="/uploads/Screenshot_2026-02-14_121042-removebg-preview.png" className="w-full h-full object-contain scale-125" alt="badge" />
                </div>
              </div>

              <h1 className="text-[52px] md:text-[88px] font-[900] tracking-tighter uppercase leading-[0.85]">
                FIND YOUR B
                <span className="inline-block w-[50px] md:w-[70px] h-[40px] md:h-[65px] bg-black rounded-xl align-middle -mt-2 mx-1 relative">
                  <span className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl">E</span>
                </span>
                ST
              </h1>

              {/* Floating Pencil Icon from Uploads */}
              <div className="absolute -right-12 md:-right-20 -top-6">
                <div className="w-14 md:w-20 h-14 md:h-20 bg-[#FFCAD4] rounded-2xl border-[3px] border-black flex items-center justify-center rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img src="/uploads/pencil.png" className="w-full h-full object-contain scale-125" alt="pencil" />
                </div>
              </div>
            </div>

            {/* Middle Row: COURSE [pill] LEARN */}
            <div className="flex items-center gap-3 md:gap-6 mt-1">
              <h1 className="text-[52px] md:text-[88px] font-[900] tracking-tighter uppercase leading-[0.85]">
                COURSE
              </h1>
              <div className="inline-flex items-center bg-white border-2 border-black rounded-full pl-5 md:pl-8 pr-2 md:pr-4 h-14 md:h-18 w-full max-w-[280px] md:max-w-[340px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] align-middle my-2">
                <div className="flex items-center h-full">
                  <img src="/uploads/web-developer.png" className="w-10 h-10 md:w-14 md:h-14 object-contain scale-125 md:scale-150" alt="web developer" />
                </div>
                <div className="ml-auto flex items-center h-full translate-x-1 md:translate-x-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h1 className="text-[52px] md:text-[88px] font-[900] tracking-tighter uppercase leading-[0.85]">
                LEARN
              </h1>
            </div>

            {/* Bottom Row: [Star] SKILL FASTER */}
            <div className="relative flex items-center gap-3 md:gap-5 mt-1">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center -mt-2">
                <span className="text-[#FF914D] text-3xl md:text-5xl">✦</span>
              </div>
              <h1 className="text-[52px] md:text-[88px] font-[900] tracking-tighter uppercase leading-[0.85]">
                SKILL FAST
                <span className="inline-flex flex-col gap-[3px] md:gap-[5px] align-middle -mt-1 md:-mt-3 mx-1">
                  <div className="w-10 md:w-16 h-[5px] md:h-[8px] bg-black"></div>
                  <div className="w-10 md:w-16 h-[5px] md:h-[8px] bg-black"></div>
                  <div className="w-10 md:w-16 h-[5px] md:h-[8px] bg-black"></div>
                </span>
                R
              </h1>

              {/* Subtext on the right */}
              <div className="absolute -right-56 md:-right-72 top-1/2 -translate-y-1/2 w-40 md:w-56 text-left hidden xl:block">
                <p className="text-[11px] md:text-[13px] font-bold text-gray-500 normal-case leading-snug tracking-tight">
                  Simplified an straight to the point courses created for you.
                </p>
              </div>
            </div>
          </div>

          {/* Google Login Bar - Aesthetic Refinement */}
          <div className="max-w-xl md:max-w-2xl mx-auto mt-16 relative">
            <button
              onClick={() => signIn("google", { callbackUrl: "/?student=true" })}
              className="w-full bg-white rounded-full border-[2.5px] border-black py-4 px-8 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.98] group"
            >
              <div className="flex items-center gap-5">
                {/* Google "G" Logo for Professional Look */}
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-sm">
                  <img
                    src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
                    className="w-6 h-6"
                    alt="Google logo"
                  />
                </div>
                <div className="flex flex-col items-start pt-1">
                  <ShinyText
                    text="CONTINUE WITH GOOGLE"
                    disabled={false}
                    speed={3}
                    className="font-extrabold text-xl md:text-2xl tracking-tighter uppercase"
                    color="#1A1A1A"
                    shineColor="#FFFFFF"
                  />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -mt-1">Simple and secure access</span>
                </div>
              </div>
              <div className="bg-[#E0C3FC] w-12 md:w-14 h-12 md:h-14 rounded-full border-2 border-black flex items-center justify-center shadow-sm group-hover:rotate-[360deg] transition-transform duration-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </button>
            {/* Decorative Sparkle Lines */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
              <div className="w-5 h-1 bg-black rounded-full rotate-[-30deg]"></div>
              <div className="w-7 h-1 bg-black rounded-full"></div>
              <div className="w-5 h-1 bg-black rounded-full rotate-[30deg]"></div>
            </div>
          </div>

          {/* Partners Logos */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-30 grayscale saturate-0 pointer-events-none">
            <span className="text-sm font-black uppercase text-gray-500 tracking-wider">Featured Partners</span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">HACK BOATS</span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">TEAM INVINCIBLE</span>
          </div>

          {/* CTA Button */}
          <div className="mt-14">
            <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-black text-sm md:text-base uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95">
              Start Learning
            </button>
          </div>
        </div>

        {/* Bottom Section - Archways */}
        <div className="w-full mt-32 flex flex-col md:flex-row items-end justify-center gap-40 px-6">
          {/* Left Archway */}
          <div className="relative w-full max-w-[380px]">
            {/* Curved Text for Left Arch */}
            <div className="absolute -top-[15px] left-0 w-full h-[190px] pointer-events-none z-10">
              <svg viewBox="0 0 380 190" className="w-full h-full overflow-visible">
                <path id="leftArchText" d="M 0,190 A 190,190 0 0,1 380,190" fill="transparent" />
                <text className="text-[12px] font-black uppercase tracking-[0.6em] fill-gray-700">
                  <textPath xlinkHref="#leftArchText" startOffset="50%" textAnchor="middle">
                    ONLINE EDUCATION • STUDY • GROW • SUCCEED
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Badge 12M+ */}
            <div className="absolute -left-10 top-20 z-10 bg-[#EFDBFF] border-[3px] border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-6deg] text-center w-28">
              <div className="w-16 h-16 rounded-full border-2 border-black mx-auto mb-2 overflow-hidden bg-[#FF4D97]">
                <img
                  src="/images/lsm girl.jpg"
                  alt="woman"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-black text-xl leading-none">12M+</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-600">STUDENT</p>
            </div>

            {/* Speech Bubble */}
            <div className="absolute -left-4 bottom-20 z-10 bg-[#7D5AE2] border-[3px] border-black p-5 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[220px] rotate-[-8deg]">
              <p className="text-white font-black text-[13px] leading-tight text-left">
                Best Way To Learn Online And Practice A Is Through Fun!
              </p>
              <div className="w-4 h-4 rounded-full bg-white absolute bottom-3 right-4 shadow-sm"></div>
            </div>

            <div className="aspect-[1.1/1.4] bg-[#7D5AE2] rounded-t-full border-[3.5px] border-black overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img
                src="/images/lsm girl.jpg"
                alt="Student"
                className="w-full h-full object-cover brightness-105 translate-y-2 scale-110"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400">
                DEVELOPMENT DESIGN MARKETING FINANCE
              </p>
            </div>
          </div>

          {/* Right Archway */}
          <div className="relative w-full max-w-[380px]">
            {/* Curved Text for Right Arch */}
            <div className="absolute -top-[15px] left-0 w-full h-[190px] pointer-events-none z-10">
              <svg viewBox="0 0 380 190" className="w-full h-full overflow-visible">
                <path id="archText" d="M 0,190 A 190,190 0 0,1 380,190" fill="transparent" />
                <text className="text-[12px] font-black uppercase tracking-[0.6em] fill-gray-700">
                  <textPath xlinkHref="#archText" startOffset="50%" textAnchor="middle">
                    GRADUATION • MASTERS • FINANCIAL AID
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Globe Icon */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-20 hidden md:block select-none grayscale contrast-200">
              <span className="text-[100px]">🌍</span>
            </div>


            <div className="aspect-[1.1/1.4] bg-[#FCAB7D] border-[4px] border-black rounded-t-full overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img
                src="/images/Vector.png"
                alt="Graduation"
                className="w-full h-full object-cover -translate-x-12 translate-y-8 scale-125"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-[#1A1A1A] py-8 border-y-[4px] border-black overflow-hidden flex select-none mt-40 -rotate-1 scale-105 relative z-20">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <ShinyText
                  text="HACK BOATS"
                  className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
                  color="#FFFFFF"
                  shineColor="#FFD600"
                  speed={2}
                />
                <span className="text-[#FFD600] text-5xl">✦</span>
                <ShinyText
                  text="UNLIMITED LEARNING"
                  className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
                  color="#FFFFFF"
                  shineColor="#E0C3FC"
                  speed={2}
                />
                <span className="text-[#E0C3FC] text-5xl">✦</span>
                <ShinyText
                  text="EXPERT MENTORS"
                  className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
                  color="#FFFFFF"
                  shineColor="#FF914D"
                  speed={2}
                />
                <span className="text-[#FF914D] text-5xl">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center gap-12 text-center">
          <div className="inline-block bg-[#E0C3FC] border-[3px] border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
            <span className="font-black uppercase tracking-widest text-sm">Our Mission</span>
          </div>
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              We are a Technology Consultant <br />
              <ShinyText text="Agency & Knowledge Provider" color="#1A1A1A" shineColor="#7D5AE2" speed={3} className="inline" />
            </h2>
            <p className="text-lg md:text-xl font-bold text-gray-600 leading-relaxed max-w-3xl mx-auto">
              To make India get ready for 4th generation industrial revolution, we need to empower young India in terms of advancement in technology and Entrepreneurship. We are building the path for Robotics, AI, IoT, blockchain, and big data.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h3 className="text-[14px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Explore The Services</h3>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                We Offer <br />
                <span className="text-[#7D5AE2]">For You</span>
              </h2>
            </div>
            <button className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#7D5AE2] transition-colors shadow-[6px_6px_0px_0px_rgba(224,195,252,1)]">
              All Services
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Hackathons', desc: 'Accelerating innovation through intense coding challenges.', color: '#FFD600', icon: '💻' },
              { title: 'Clubs', desc: 'Specialized communities for tech and entrepreneurship.', color: '#E0C3FC', icon: '🤝' },
              { title: 'Projects', desc: 'Research and development for next-gen products.', color: '#FF914D', icon: '🚀' },
              { title: 'Accreditation', desc: 'Support for institutions and FDP programs.', color: '#BDE0FE', icon: '📜' }
            ].map((service, i) => (
              <div
                key={i}
                className="group p-8 bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 relative overflow-hidden"
              >
                <div
                  className="w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center text-3xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform"
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h4>
                <p className="text-sm font-bold text-gray-500 leading-snug">{service.desc}</p>
                <div className="mt-8 flex items-center gap-2 font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                  Next Step <span className="text-xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-[#1A1A1A] py-24 my-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: 5, suffix: '+', label: 'Active Projects', color: '#FFD600' },
              { num: 20, suffix: 'K+', label: 'Coffee Cups', color: '#E0C3FC' },
              { num: 72, suffix: '+', label: 'Completed', color: '#FF914D' },
              { num: 625, suffix: '+', label: 'Happy Clients', color: '#BDE0FE' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-6xl md:text-7xl font-black tracking-tighter" style={{ color: stat.color }}>
                  <CountUp to={stat.num} duration={2} />
                  <span>{stat.suffix}</span>
                </div>
                <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs opacity-60">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Value Props Section - Pure Typographic Aesthetic (Tightened Spacing) */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 mb-10 flex flex-col justify-center">
          <div className="flex flex-col mb-20 border-l-[6px] border-[#7D5AE2] pl-12">
            <h2 className="text-8xl md:text-[120px] font-black tracking-tighter uppercase leading-[0.8] mb-8">
              The <br />
              <span className="text-transparent border-black" style={{ WebkitTextStroke: '1px #E5E7EB' }}>Philosophy.</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs max-w-md leading-relaxed">
              We've stripped away the noise and secondary layers to focus on the core attributes that define a master learning experience.
            </p>
          </div>

          <div className="flex flex-col">
            {[
              {
                id: '01',
                title: 'Quality Results',
                color: '#FFD600',
                desc: 'Industry-standard curriculum designed to deliver professional growth with every single lesson.',
                icon: (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                )
              },
              {
                id: '02',
                title: 'Deep Analytics',
                color: '#E0C3FC',
                desc: 'Real-time tracking of your individual learning progress and deep performance metrics.',
                icon: (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20V16" />
                  </svg>
                )
              },
              {
                id: '03',
                title: 'Honest Pricing',
                color: '#FF914D',
                desc: 'World-class education made accessible through practical, transparent pricing models.',
                icon: (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )
              },
              {
                id: '04',
                title: 'Seamless UX',
                color: '#BDE0FE',
                desc: 'A frictionless, intuitive learning platform built for the modern student experience.',
                icon: (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                )
              },
              {
                id: '05',
                title: 'Expert Help',
                color: '#C7FFD8',
                desc: 'Join a global community of learners and professionals to achieve your career goals.',
                icon: (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                )
              }
            ].map((prop, i) => (
              <div
                key={i}
                className="group py-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-10 hover:bg-gray-50/50 transition-all duration-700 ease-in-out cursor-default relative overflow-hidden px-4 md:px-0"
              >
                {/* Background Watermark reveal on hover */}
                <span className="absolute left-[-2%] top-1/2 -translate-y-1/2 text-[20vw] font-black opacity-0 group-hover:opacity-[0.02] transition-all duration-1000 select-none pointer-events-none uppercase tracking-tighter">
                  {prop.title}
                </span>

                <div className="flex items-center gap-16 relative z-10 shrink-0">
                  <span className="text-sm font-black text-gray-200 group-hover:text-[#7D5AE2] transition-colors duration-500 tracking-widest">{prop.id}</span>
                  <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter group-hover:translate-x-8 transition-transform duration-700 whitespace-nowrap">
                    {prop.title}
                  </h3>
                </div>

                <div className="max-w-md hidden lg:block opacity-0 group-hover:opacity-100 translate-x-12 group-hover:translate-x-0 transition-all duration-700 delay-100 relative z-10">
                  <p className="text-gray-500 font-bold leading-relaxed italic text-base">
                    "{prop.desc}"
                  </p>
                </div>

                <div className="text-[#E5E7EB] group-hover:text-black group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 relative z-10 shrink-0">
                  {prop.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <div className="w-1 h-20 bg-gray-100"></div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full pt-20 pb-10 px-6 md:px-12 bg-white border-t-[4px] border-black mt-10 relative overflow-hidden">
          <Noise
            patternSize={250}
            patternScaleX={2}
            patternScaleY={2}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-20">
            {/* Branding & Mission */}
            <div className="flex flex-col gap-6 lg:col-span-1 text-center md:text-left">
              <div className="flex flex-col -gap-1">
                <span className="text-4xl font-black leading-none tracking-tight">HACK</span>
                <span className="text-4xl font-black leading-none tracking-tight text-[#FFD600]">BOATS</span>
              </div>
              <p className="text-sm font-bold text-gray-500 leading-relaxed">
                We promise to bring the best solution for your growth. Empowering the 4th generation industrial revolution.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                {['🐦', '📸', '💼', '🔗'].map((icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-pointer">
                    <span className="text-xl">{icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-8">
              <h4 className="text-lg font-black uppercase tracking-widest border-l-4 border-[#7D5AE2] pl-4">Company</h4>
              <nav className="flex flex-col gap-4">
                {['Home', 'Services', 'About', 'Team', 'Clients', 'Contact'].map((link) => (
                  <a key={link} href="#" className="font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-xs">{link}</a>
                ))}
              </nav>
            </div>

            {/* Services Links */}
            <div className="flex flex-col gap-8">
              <h4 className="text-lg font-black uppercase tracking-widest border-l-4 border-[#FFD600] pl-4">Services</h4>
              <nav className="flex flex-col gap-4">
                {['Internship', 'Hackathon', 'Projects', 'Publications', 'PhD consultant', 'Boot Camps', 'FDPs'].map((link) => (
                  <a key={link} href="#" className="font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-xs">{link}</a>
                ))}
              </nav>
            </div>

            {/* More Services */}
            <div className="flex flex-col gap-8">
              <h4 className="text-lg font-black uppercase tracking-widest border-l-4 border-[#E0C3FC] pl-4">Advanced</h4>
              <nav className="flex flex-col gap-4">
                {['Intern Hiring', 'Accreditation', 'Animatronics', 'Product Dev', 'Research'].map((link) => (
                  <a key={link} href="#" className="font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-xs">{link}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-10 border-t-[3px] border-black flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-black uppercase tracking-widest text-[11px] text-gray-400">
              © 2019 - {new Date().getFullYear()} HACKBOATS. ALL RIGHTS RESERVED.
            </p>
            <p className="font-black uppercase tracking-widest text-[11px] text-gray-400 flex items-center gap-1">
              DESIGN BY <ShinyText text="TEAM INVINCIBLE" color="#1A1A1A" shineColor="#7D5AE2" speed={3} className="text-black inline" />
            </p>
          </div>
        </footer>

        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: fit-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </main>
    </div>
  )
}

export default login
