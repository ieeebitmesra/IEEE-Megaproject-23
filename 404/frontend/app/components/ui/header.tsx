import Link from 'next/link'
import MobileMenu from './mobile-menu'

export default function Header() {
  return (
    <header className="absolute w-full z-30 mb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <p className='text-2xl font-bold'>NewsX</p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex gap-x-2 grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="#video"
                  className="font-medium hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Our Project
                </Link>
              </li>
              <li>
                <Link
                  href="#intro"
                  className="font-medium hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Features
                </Link>
              </li>
              <li className='ml-4'>
                <Link
                  href="#video"
                >
                  <button className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 rounded-md overflow-hidden h-12 w-40 bg-sky-200 p-2 flex justify-center items-center font-bold">
                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                    <p className="z-10">See more</p>
                  </button>

                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}