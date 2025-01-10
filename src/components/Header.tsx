import CalendarSvg from './svg/CalendarSvg';
import Link from 'next/link';

const Header = () => {
  return (
    <Link href="/">
      <div className="h-9 border-b flex items-center gap-1 ml-2">
        <p>
          Time<strong>Blocks</strong>
        </p>
      </div>
    </Link>
  );
};

export default Header;
