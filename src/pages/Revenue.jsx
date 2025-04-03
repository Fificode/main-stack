import Transaction from '../components/Transaction'
import Header from '../components/Header'
import React from 'react'

const Revenue = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-[124px] px-[140px] w-full'>
      <Header/>
      <Transaction/>
    </div>
  )
}

export default Revenue