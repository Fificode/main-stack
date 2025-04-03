import React, {useEffect} from 'react'
import Avatar from './Avatar'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Icon } from '@iconify/react';
import { CgDebug } from "react-icons/cg";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { PiSignOutLight } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/userSlice';
import { FaSpinner } from 'react-icons/fa6';

const ProfileDropdown = () => {
    const profileContent = [
{
name: "Settings",
icon: <IoSettingsOutline className='w-5 h-5 text-primary'/>,
},
{
name: "Purchase History",
icon: <MdOutlineReceiptLong className='w-5 h-5 text-primary'/>,
},
{
name: "Refer and Earn",
icon: <Icon icon="ic:outline-card-giftcard" style={{color: "#131316", width: "20px", height: "20px"}}/>,
},
{
name: "Integrations",
icon: <Icon icon="proicons:apps" width="20" height="20" style={{color: "#131316"}}/>,
},
{
name: "Report Bug",
icon: <CgDebug className='w-5 h-5 text-primary' />,
},
{
name: "Switch Account",
icon: <MdOutlineSwitchAccount className='w-5 h-5 text-primary'/>,
},
{
name: "Sign Out",
icon: <PiSignOutLight className='w-5 h-5 text-primary'/>,
},
    ]; 
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(fetchUser());
    }, [dispatch]);
  
   
    if (error) return <p>Error: {error}</p>;
  
  return (
    <div className='z-[100] w-[23vw] h-auto bg-white shadow-md  mr-4 rounded-[10px] flex flex-col px-6'>
     {loading && <div className="flex justify-center items-center"> <FaSpinner className="text-primary animate-spin mx-auto w-5 h-5"/> </div> }
{user && <>
    <div className='flex gap-2 items-center pt-6 pb-3'>
      <Avatar firstName={user?.first_name} lastName={user?.last_name}  width = "w-[40px]"
      height = "h-[40px]"/>
      <div className='flex flex-col'>
        <h2 className='font-[600] text-[16px] leading-[24px] text-primary'>{user?.first_name}{" "}{user?.last_name} </h2>
        <p className='font-[500] text-[12px] leading-[18px] text-secondary'>{user?.email}</p>
      </div>
    </div>
    <div>
        {profileContent.map((profile) => (
<div key={profile.name} className='flex items-center gap-3 py-3'>
    <div>{profile.icon}</div>
    <h3 className='font-[400] text-[14px] leading-[24px] text-primary'>{profile.name}</h3>
</div>
        ))}
    </div>
    </>}
            </div>
  )
}

export default ProfileDropdown