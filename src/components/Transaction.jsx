import React, {useEffect, useState} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionSlice';
import FilterModal from './FilterModal';

const Transaction = () => {
    const dispatch = useDispatch();
      const { transactions} = useSelector((state) => state.transaction);
const [filterModalOpen, setFilterModalOpen] = useState(false);
      useEffect(() => {
        dispatch(fetchTransactions());
      }, [dispatch]);
 
  return (
    <>
    <div className='mt-[82px] mb-[50px] w-full'>
    <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
<h2 className='font-[700] text-[24px] leading-[32px] text-primary'>24 Transactions</h2>
<p className='font-[500] text-[14px] leading-[16px] text-secondary'>Your transactions for the last 7 days</p>
        </div>
        <div className='flex gap-[12px] items-center'>
<button onClick={() => setFilterModalOpen(true)} className='flex justify-center items-center gap-[8px] bg-[#EFF1F6] rounded-[100px] w-auto h-[48px] py-[12px] px-[20px] font-[600] text-[16px] leading-[24px] text-primary cursor-pointer'>Filter <IoIosArrowDown className='w-3 h-3 text-primary'/> </button>
<button className='flex justify-center items-center gap-[8px] bg-[#EFF1F6] rounded-[100px] w-auto h-[48px] py-[12px] px-[20px] font-[600] text-[16px] leading-[24px] text-primary cursor-pointer'>Export list<BsDownload className='w-3 h-3 text-primary'/></button>
        </div>
    </div>
    <div className='border-b border-[#EFF1F6] mt-6 mb-[33px] w-full'></div>
    <div className='flex flex-col gap-6 w-full'>
    {transactions.map((item) => (
        <div className='flex justify-between'>
<div className='flex items-center gap-[14px]'>
<div className={`w-[48px] h-[48px] rounded-full p-[14px] ${item.type === "deposit" ? "bg-[#E3FCF2]" : "bg-[#F9E3E0]"}`}>
    {item.type === "deposit" ? <GoArrowDownLeft className='w-5 h-5 text-[#075132]' /> : <GoArrowUpRight className='w-5 h-5 text-[#961100]'/>}
</div>
<div className='flex flex-col items-start  gap-[9px]'>
    {item?.metadata?.product_name && <h3 className='font-[500] text-[16px] leading-[24px] text-primary'>{item?.metadata?.product_name}</h3>}
    {item?.type === "withdrawal" && <h3 className='font-[500] text-[16px] leading-[24px] text-primary'>Cash withdrawal</h3>}

    {item.status && <p className={`font-[500] text-[14px] leading-[16px] ${item.status === "successful" ? "text-[#0EA163]" : "text-[#A77A07]"}`}> {item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>}
   {item?.metadata?.name && <p className="font-[500] text-[14px] leading-[16px] text-secondary">{item?.metadata?.name && item?.metadata?.name }</p>}
</div>
</div>
<div className='flex flex-col gap-[4px] items-end'>
    <h3 className='font-[700] text-[16px] leading-[18px] text-primary'>USD {item.amount}</h3>
    <p className='font-[500] text-[14px] leading-[16px] text-secondary'>{item.date}</p>
</div>
        </div>
    ))}
    </div>
    </div>
    {filterModalOpen && <FilterModal closeModal={() => setFilterModalOpen(false)}/>}
    </>
  )
}

export default Transaction