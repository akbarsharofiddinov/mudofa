import React from 'react'

interface NavbarItemProps {
  children?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ children }) => {
  return (
    <>
      <li className={`flex flex-col items-center gap-2 relative`}>
        {children}
      </li>
    </>
  )
}

export default NavbarItem