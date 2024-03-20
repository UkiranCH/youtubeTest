import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react'
import logo from '../assets/Logo.png'
import Button from '../componentes/Button'
import { useState } from 'react'
import { useSiderbarContext } from '../contexts/SidebarContext'

export const PageHeader = () => {
const [showFullWidthSearch, setShowFullWidthSearch]  = useState(false);

  return (
   
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <PageHeaderFirstSection hidden={showFullWidthSearch}/>
            <form className={`flex-grow justify-center ${showFullWidthSearch ? "flex": "hidden md:flex"}`}>
            
                {showFullWidthSearch &&
                <Button onClick={() => setShowFullWidthSearch(false)} variant="gost" size="icon" className=' flex-shrink-0'>
                        <ArrowLeft />
                </Button>
                }
                <div className='flex flex-grow max-w-[600px]'>
                    <input type='search' placeholder='Search' className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary-default px-4 text-lg w-full focus:border-blue-500 outline-none'/>
                    <Button className='py-2 px-4 border-secondary-border border border-l-0 rounded-r-full flex-shrink-0'>
                        <Search />
                    </Button>

                </div>
                <Button type='button' size="icon" className='flex-shrink-0'>
                    <Mic />
                </Button>
            </form>
            <div className={`flex flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden": "flex"}`}>
                <Button onClick={() => setShowFullWidthSearch(true) } variant="gost" size="icon" className='md:hidden'>
                    <Search />
                </Button>
                <Button variant="gost" size="icon" className='md:hidden'>
                    <Mic />
                </Button>
                <Button variant="gost" size="icon">
                    <Upload />
                </Button>
                <Button variant="gost" size="icon">
                    <Bell />
                </Button>
                <Button variant="gost" size="icon">
                    <User />
                </Button>
            </div>
        </div>
   
    
  )
}

type PageHeaderFirstSectionProps={
    hidden? : boolean
}

export function PageHeaderFirstSection( {hidden = false} : PageHeaderFirstSectionProps){
    
    const { toggle} = useSiderbarContext()
    return (
        <div className= {`flex gap-4 items-center flex-shrink-0 ${hidden ? "hidden": "flex"}`}>
                <Button onClick={toggle} variant="gost" size="icon">
                    <Menu />
                </Button>
                <a href="/" >
                    <img src={logo} className='h-6' />
                </a>
            </div>
    )
}