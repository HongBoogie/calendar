import Link from 'next/link';

const Header = () => {
  return (
    <Link href="/">
      <div className="h-9 flex items-center gap-1 ml-2">
        <p className='fixed left-2'>
          Time<strong>Blocks</strong>
        </p>
      </div>
    </Link>
  );
};

export default Header;
