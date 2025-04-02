import React from 'react'
import { sideLinks } from '../lib/sideLinks'
import { Icon } from '@iconify/react'



const Sidebar = () => {

  return (
    <div className='z-[100] fixed left-4 top-[230px] w-[48px] h-auto rounded-[100px] p-1 flex flex-col items-center gap-4 shadow-md'>
    {
sideLinks.slice(0, -1).map((link) => (
    <button key={link.name} className='relative p-2 hover:bg-[#EFF1F6] rounded-full cursor-pointer group'>
    {link.icon ? (
            <Icon icon={link.icon} width="20px" height="20px" />
          ) : (
            <img src={link.image} alt={`${link.name} Icon`} className="grayscale transition-all duration-300 group-hover:grayscale-0" />
          )}
        <span className="absolute left-12 top-0 bg-primary shadow-md px-2 py-1 rounded-md text-sm font-medium text-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {link.name}
          </span>
    </button>
))
    }

    </div>
  )
}

export default Sidebar