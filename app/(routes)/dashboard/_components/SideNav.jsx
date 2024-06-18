
"use client"
import React, { useEffect } from 'react'
import Image from "next/image"
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budget',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    // Get the current path
    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image
                src={'/logo.svg'}
                alt='logo'
                width={160}
                height={100}
            />

            <div className='mt-5 '>
                {menuList.map((i , index) => (
                    <Link href={i.path} key={index}>
                        <h2 className={`flex gap-2 text-lg mb-2  items-center  text-gray-500 font-medium p-3
                        cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
                        ${path == i.path && 'text-primary bg-blue-100'}
                        `}>
                            <i.icon />
                            {i.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className='fixed bottom-10 p-5 flex gap-3 items-center'>
                <UserButton />
                 Profile
                {/* <div className='text-gray-600 font-semibold'>Profile</div> */}
            </div>
        </div>
    )
}


export default SideNav;
