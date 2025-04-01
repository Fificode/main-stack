import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import mainstack from "../assets/mainstack-logo.svg"
import { GoHome } from "react-icons/go";
import { Icon } from "@iconify/react";
import { GrAppsRounded } from "react-icons/gr";
import { CgBell } from "react-icons/cg";
import { MdOutlineChat } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import Avatar from './Avatar';
import { GoHomeFill } from "react-icons/go";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appModalOpen, setAppModalOpen] = useState(false);
  const navLinks = [
    {
      id: 1,
      name: "Home",
      inActiveIcon: <GoHome className='text-secondary w-5 h-5'/>,
      activeIcon: <GoHomeFill className='text-white w-5 h-5' />,
      path: "/",
    },
    {
      id: 2,
      name: "Analytics",
      inActiveIcon: <Icon icon="majesticons:analytics-line" width="20" height="20" style={{color: "#56616B"}}/>,
      activeIcon: <Icon icon="majesticons:analytics-line" width="20" height="20" style={{color: "#fff"}}/>,
      path: "/analytics",
    },
    {
      id: 3,
      name: "Revenue",
      inActiveIcon: <Icon icon="fa6-solid:money-bills" width="20" height="20" style={{color: "#56616B"}}/>,
      activeIcon: <Icon icon="fa6-solid:money-bills" width="20" height="20" style={{color: "#fff"}}/>,
      path: "/revenue",
    },
    {
      id: 4,
      name: "CRM",
      inActiveIcon:<Icon icon="mdi:users-outline" width="20" height="20" style={{color: "#56616B"}}/>,
      activeIcon:<Icon icon="mdi:users-outline" width="20" height="20" style={{color: "#fff"}}/>,
      path: "/CRM",
    },
    {
      id: 5,
      name: "Apps",
      inActiveIcon: <Icon icon="proicons:apps" width="20" height="20" style={{color: "#56616B"}}/>,
      activeIcon: <Icon  icon="ri:apps-2-ai-fill" width="20" height="20" style={{color: "#fff"}} />,
      modal: true,
    },
   
  ]

  const handleNavigation = (nav) => {
    if (nav.modal) {
      setAppModalOpen(!appModalOpen);
    } else {
      setAppModalOpen(false);
      navigate(nav.path);
    }
  };
  return (
    <div className='m-4'>
    <div className='w-full bg-white h-[64px] shadow-md border-none rounded-[100px] flex justify-between items-center p-[12px]'>

  <img src={mainstack} alt='Mainstack Logo' className='w-[36px] h-[36px]'/>

<div className='flex items-center justify-center gap-[20px]'>
{
  navLinks.map((nav) =>{
    const isActive = location.pathname === nav.path || (nav.modal && appModalOpen);
    return(
    <button key={nav.id}  onClick={() => handleNavigation(nav)} className={`flex gap-[4px] items-center h-[40px] rounded-[100px] py-[8px] px-4 cursor-pointer transition-all ${
                  isActive ? "bg-primary text-white" : "text-secondary"
                }`}>
 {isActive ? nav.activeIcon : nav.inActiveIcon}
<h2 className='font-[600] text-[16px] leading-[24px]'>{nav.name}</h2>
    </button>
  )})
}
</div>
<div className='flex gap-[20px] items-center'>
<button className='cursor-pointer'><CgBell className='text-secondary w-5 h-5'/></button>
<button className='cursor-pointer'><MdOutlineChat className='text-secondary w-5 h-5'/></button>
<button className='cursor-pointer flex gap-2 items-center bg-[#EFF1F6] border-0 rounded-[100px] py-[4px] pl-[5px] pr-[12px]'>
<Avatar firstName="Olivier" lastName="Jones"/>
<IoMenuOutline className='text-secondary w-6 h-6' />
</button>
</div>
    </div>
    {appModalOpen && (
      <div>
      Apps modal
      <button onClick={() => setAppModalOpen(false)} className="mt-4 px-4 py-2 bg-primary text-white rounded">
              Close
            </button>
      </div>
    )}
    </div>
  )
}

export default Navbar