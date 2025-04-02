import React from 'react'
import { FiInfo } from "react-icons/fi";

const RevenueSummary = () => {
    const data = [
{
    title: "Ledger Balance",
    amount: "0.00",
},
{
    title: "Total Payout",
    amount: "55,080.00",
},
{
    title: "Total Revenue",
    amount: "175,580.00",
},
{
    title: "Pending Payout",
    amount: "0.00",
},
    ]
  return (
    <div className='w-[25%] flex flex-col gap-8'>
{
    data.map((item) => (
        <div key={item.title} className='flex justify-between items-start'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-secondary font-[500] textt-[14px] leading-[16px]'>{item.title}</h3>
                <h2 className='text-primary font-[700] text-[28px] leading-[38px]'>{item.amount}</h2>
            </div>
            <FiInfo className='w-5 h-5 text-[#888F95]'/>
        </div>
    ))
}
    </div>
  )
}

export default RevenueSummary