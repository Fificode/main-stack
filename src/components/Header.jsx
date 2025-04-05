import React from 'react'
import RevenueSummary from './RevenueSummary'
import {Component as AreaChart} from './AreaChart'

const Header = ({filteredTransactions}) => {
  return (
    <div className='flex gap-4 w-full'>
    <AreaChart filteredTransactions={filteredTransactions}/>
        <RevenueSummary/>
    </div>
  )
}

export default Header