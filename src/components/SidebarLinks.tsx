'use client';

import React, { useEffect } from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type SidebarLinksProps = {
  href: string;
  text: string;
}

const SidebarLinks = ({href, text} : SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div className={clsx('h-12 flex items-center m-2 rounded-md p-2', {
        ['bg-sky-100 text-sky-500']: isActive
      })}>{text}</div>
    </Link>
  )
}

export default SidebarLinks