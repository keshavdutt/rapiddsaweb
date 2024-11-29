// "use client";

// import { Button } from "@/components/ui/button";
// import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
// import { Menu } from "lucide-react"; // Import the hamburger icon
// import { useState } from "react";
// import { ThemeToggle } from "./theme-toggle";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="border-b">
//       <div className="flex h-16 items-center px-4 container mx-auto justify-between">
//         {/* Left Section */}
//         <div className="font-bold text-2xl flex items-center">
//           <Link href="/" className="flex items-center">
//             <span className="inline bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
//               RapidDSA
//             </span>
//             <span className="inline-block ml-2">🚀</span>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <Menu className="h-5 w-5" />
//         </Button>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-4">
//           <SignedOut>
//             <Button variant="outline" asChild>
//               <Link href="/dashboard" className="text-base">
//                 Log In
//               </Link>
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             {/* <UserButton/> */}
//             <Button variant="outline" asChild>
//               <Link href="/dashboard" className="text-base">
//                 Log In
//               </Link>
//             </Button>
//           </SignedIn>
//           <Button variant="outline" asChild>
//              <ThemeToggle />
//             </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden p-4 space-y-4 flex flex-col items-center">
//             <SignedOut>
//               <Button variant="outline" asChild className="w-full">
//                 <Link href="/dashboard" className="text-base">
//                   Log In
//                 </Link>
//               </Button>
//             </SignedOut>
//             <SignedIn>
//               <UserButton/>
//             </SignedIn>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'

import { Menu } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Navbar() {
    return (
        // <header className='fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm mx-auto'>
        <div className='border-b'>
            <div className='flex h-16 items-center px-4  py-4 container mx-auto justify-between bg-background/20 backdrop-blur-sm '>


                <nav className='container flex max-w-none items-center justify-between'>
                    <Sheet>
                        <SheetTrigger className='sm:hidden'>
                            <Menu className='h-6 w-6' />
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <ul className='flex flex-col gap-3 text-sm'>
                                <li className='font-serif text-2xl font-semibold'>
                                    <SheetClose asChild>
                                        <Link href='/'>RapidDSA</Link>
                                    </SheetClose>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>

                    <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
                        {/* <li className='font-serif text-xl font-semibold'>
                            <Link href='/'>RapidDSA</Link>
                        </li> */}

                        <div className="font-bold text-2xl flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="inline bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
                                    RapidDSA
                                </span>
                                <span className="inline-block ml-2">🚀</span>
                            </Link>
                        </div>


                    </ul>

                    <div className='flex items-center justify-between gap-6'>
                        <ThemeToggle />

                        <Button size='sm' variant='secondary' asChild>
                            <Link href='/dashboard'>Get Started</Link>
                        </Button>

                        <SignedOut>
                            <SignInButton>
                                <Button size='sm'>Sign in</Button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
            </div>
        </div>
    )
}
