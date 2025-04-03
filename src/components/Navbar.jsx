import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import mainstack from "../assets/mainstack-logo.svg"
import { GoHome } from "react-icons/go";
import { Icon } from "@iconify/react";
import { CgBell } from "react-icons/cg";
import { MdOutlineChat } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import Avatar from './Avatar';
import { GoHomeFill } from "react-icons/go";
import ProfileDropdown from './ProfileDropdown';
import AppsDropdown from './AppsDropdown';
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/userSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const [activeAppName, setActiveAppName] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const appsButtonRef = useRef(null);
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
      setProfileDropdownOpen(false);
      setAppsDropdownOpen(!appsDropdownOpen);
      if (!appsDropdownOpen) {
        const rect = appsButtonRef.current.getBoundingClientRect();
        console.log("Rect", rect);
        const rightOffset = window.innerWidth - rect.right - 200;
    setDropdownPosition({ top: rect.bottom  , right: rightOffset  });
        setActiveAppName(nav.name);
      } else {
        setActiveAppName(null);
      }
    } else {
      setAppsDropdownOpen(false);
      setActiveAppName(null);
      navigate(nav.path);
    }
  };
  const handleProfileDropdown =() => {
    setAppsDropdownOpen(false);
    setProfileDropdownOpen(!profileDropdownOpen)
  }
  const handleAppItemClick = (appName) => {
    setActiveAppName(appName);
    // setAppsDropdownOpen(false); 
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className='flex justify-center items-center max-w-full relative'>
    <div className='w-full z-[1000] fixed top-0 right-0  bg-white h-[64px] border border-red-600 shadow-md border-none rounded-[100px] flex justify-between items-center pt-[28px] pb-[18px] px-[12px]'>

  <img src={mainstack} alt='Mainstack Logo' className='w-[36px] h-[36px]'/>

<div className='flex items-center justify-center gap-[20px]'>
{
  navLinks.map((nav) =>{
    const isActive = location.pathname === nav.path || (nav.modal && appsDropdownOpen);
    return(
    <div ref={nav.modal ? appsButtonRef : null} key={nav.id}  onClick={() => handleNavigation(nav)} className={`flex gap-[4px] items-center h-[40px] rounded-[100px] py-[8px] px-4 cursor-pointer transition-all  ${
                  isActive ? "bg-primary text-white" : "text-secondary hover:bg-[#EFF1F6]"
                }`}>
 {isActive ? nav.activeIcon : nav.inActiveIcon}
<h2 className='font-[600] text-[16px] leading-[24px] flex items-center'>{nav.name}
{nav.modal && appsDropdownOpen && activeAppName !== 'Apps' && (
           <div className='flex gap-2 items-center ml-3'><div class="border-l-1 border-secondary h-10 "></div> <span className="ml-1 text-[12px] font-normal">{activeAppName}</span>
           <IoIosArrowDown className='text-white w-4 h-4'/>
           </div>
          )}
</h2>
    </div>
  )})
}
</div>
<div className='flex gap-[20px] items-center'>
<button className='cursor-pointer'><CgBell className='text-secondary w-5 h-5'/></button>
<button className='cursor-pointer'><MdOutlineChat className='text-secondary w-5 h-5'/></button>
<button onClick={handleProfileDropdown} className='cursor-pointer flex gap-2 items-center bg-[#EFF1F6] border-0 rounded-[100px] py-[4px] pl-[5px] pr-[12px]'>
<Avatar firstName={user?.first_name} lastName={user?.last_name}/>
<IoMenuOutline className='text-secondary w-6 h-6' />
</button>
</div>
    </div>
    {appsDropdownOpen && (
      <div className='fixed'  style={{
      top: `${dropdownPosition.top}px`, // Use dynamic position
      right: `${dropdownPosition.right}px`}}>
      <AppsDropdown onItemClick={handleAppItemClick} position={dropdownPosition}/>
      </div>
    )}
    {
      profileDropdownOpen && (
        <div className='fixed top-[70px] right-0'>
       <ProfileDropdown/>
       </div>
      )
    }
    </div>
  )
}

export default Navbar