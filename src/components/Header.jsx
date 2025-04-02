import React from 'react'
import RevenueSummary from './RevenueSummary'
import {Component as AreaChart} from './AreaChart'

const Header = () => {
  return (
    <div className='flex gap-4 w-full'>
    <AreaChart/>
        <RevenueSummary/>
    </div>
  )
}

export default Header