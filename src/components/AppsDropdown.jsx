import { sideLinks } from '../lib/sideLinks'
import React from 'react'
import { Icon } from '@iconify/react'
import { IoIosArrowForward } from "react-icons/io";

const AppsDropdown = ({onItemClick}) => {
    const handleClick = (linkName) => {
        if (onItemClick) {
          onItemClick(linkName);
        }
        // Optionally, you can handle navigation or other actions here
        console.log(`Clicked: ${linkName}`);
      };
  return (
    <div className='z-[100] absolute top-[80px] right-[15%] w-[25vw] h-auto bg-white shadow-md mt-1 mr-4 rounded-[10px] flex flex-col items-start gap-3 px-3 py-6'>
    {
        sideLinks.map((link) => (
            <button key={link.name}  onClick={() => handleClick(link.name)} className='flex justify-between  p-2 hover:shadow-md hover:rounded-[12px] rounded-full cursor-pointer group w-full'>
            <div className='flex gap-3 items-center'>
            <div className='w-10 h-10 flex justify-center items-center shadow-sm rounded-[12px]'>
    {link.icon ? (
            <Icon icon={link.icon} width="20" height="20" />
          ) : (
            <img src={link.image} alt={`${link.name} Icon`} className="" />
          )}
          </div>
          <div className='flex flex-col gap-1 items-start'>
        <h3 className="text-sm font-medium text-primary text-nowrap ">
            {link.name}
          </h3>
          <p className='text-[12px] font-[400] text-secondary text-nowrap'>{link.description}</p>
          </div>
          </div>
          <button className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'><IoIosArrowForward className='text-secondary w-4 h-4'/></button>
          </button>
        ))
    }
   
    </div>
  )
}

export default AppsDropdown