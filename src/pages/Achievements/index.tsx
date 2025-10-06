import React from 'react'
import InfiniteMenu from './InfiniMenu'

import sport1 from "@/assets/sportsmen/sport-1.png"

const items = [
  {
    image: sport1,
    link: 'https://google.com/',
    title: 'Bokschi',
    description: 'Murodjon Ahmadaliyev 1994 2- noyabr'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

const Achievements: React.FC = () => {
  return (
    <>
      <div style={{ height: '100%', position: 'relative' }}>
        <InfiniteMenu items={items} />
      </div>
    </>
  )
}

export default Achievements