import Image from 'next/image'
import CalendarSvg from './svg/CalendarSvg'

const Header = () => {
  return (
    <div className='h-9 border-b flex items-center gap-1'>
        <CalendarSvg />
        <p>Time<strong>Blocks</strong></p>
    </div>

  )
}

export default Header