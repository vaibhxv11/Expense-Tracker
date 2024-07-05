import React from 'react'
import Image from 'next/image'
const Hero = () => {
  return (
    <section className="bg-gray-50 -mt-20 flex flex-col items-center">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Manage Your Expense
          <strong className="font-extrabold text-primary sm:block"> Track Your Money </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
        Start Tracking Your Budget and Saving Today!
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/sign-in"
          >
            Get Started
          </a>
  
        
        </div>
      </div>
    </div>

    <Image  src={'/dashboard.png'} 
    className='-mt-32 pb-20 '
        width={1400} 
        height={600}
        alt='dashboard'/> 
  </section>
    
  )
}

export default Hero
