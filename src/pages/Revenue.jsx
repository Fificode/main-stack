import React, {useEffect} from 'react'
import Transaction from '../components/Transaction'
import Header from '../components/Header'
import useTransactionFilter from '../custom-hooks/TransactionFilter'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../store/transactionSlice'

const Revenue = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const { selectedPeriod, setSelectedPeriod, filteredTransactions,  setDateRange, setTransactionType, setTransactionStatuses, clearFilters} = useTransactionFilter(transactions);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

console.log("Filtered Transactions", filteredTransactions)
console.log("Transactions", transactions)
  return (
    <div className='flex flex-col justify-center items-center mt-[124px] px-[140px] w-full'>
      <Header filteredTransactions={filteredTransactions}/>
      <Transaction filteredTransactions={filteredTransactions} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} setDateRange={setDateRange} setTransactionStatuses={setTransactionStatuses} setTransactionType={setTransactionType} clearFilters={clearFilters} />
    </div>
  )
}

export default Revenue