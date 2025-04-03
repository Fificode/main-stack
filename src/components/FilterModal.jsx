import React from 'react'

const FilterModal = ({closeModal}) => {
  return (
    <div
        className="fixed inset-0 z-[1000] flex justify-center items-center lg:items-start lg:justify-end bg-transparent bg-opacity-40  font-dmsans"
        onClick={closeModal}
      >
        {/* <div
          className="bg-white shadow-lg w-full lg:w-[25vw] rounded-l-[10px] h-[90%] lg:h-full overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbar-thumb hover:scrollbar-thumb-scrollbar-thumb-hover  scroll-smooth flex flex-col gap-8"
          onClick={(e) => e.stopPropagation()}
        ></div> */}
        </div>
  )
}

export default FilterModal