import React from 'react'
import SidebarLinks from './SidebarLinks'

const Sidebar = () => {
  return (
    <div className='fixed left-0 w-40 border-r min-h-home bg-white z-20'>
      <SidebarLinks href='/' text='캘린더' />
      <SidebarLinks href='/todos' text='할일' />
    </div>
  )
}

export default Sidebar