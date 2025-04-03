import React, {useEffect} from 'react'
import { FiInfo } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallet } from '../store/walletSlice';
import { FaSpinner } from 'react-icons/fa6';

const RevenueSummary = () => {
     const dispatch = useDispatch();
          const { wallet, loading, error } = useSelector((state) => state.wallet);
        
          useEffect(() => {
            dispatch(fetchWallet());
          }, [dispatch]);
        
          if (error) return <p>Error: {error}</p>;
    const data = [
{
    title: "Ledger Balance",
    amount: wallet?.ledger_balance,
},
{
    title: "Total Payout",
    amount: wallet?.total_payout,
},
{
    title: "Total Revenue",
    amount: wallet?.total_revenue,
},
{
    title: "Pending Payout",
    amount: wallet?.pending_payout,
},
    ]
  return (
    <div className='w-[25%] flex flex-col gap-8'>
     {loading && <div className="flex justify-center items-center"> <FaSpinner className="text-primary animate-spin mx-auto w-10 h-10"/> </div> }
{
   wallet &&  data.map((item) => (
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