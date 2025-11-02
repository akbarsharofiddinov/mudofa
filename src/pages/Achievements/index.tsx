import React from "react";
import InfiniteMenu from "./InfiniMenu";

import sport1 from "@/assets/sportsmen/sport-1.png";
// You can also import videos instead of using /public paths:
import clip1 from "@/assets/videos/clip1.mp4";
import clip2 from "@/assets/videos/clip2.mp4";

const items = [
  {
    image: sport1,
    link: "https://google.com/",
    title: "Bokschi",
    description: "Murodjon Ahmadaliyev 1994 2- noyabr",
  },
  {
    video: clip1, // put file into public/videos/clip1.mp4
    link: "https://google.com/",
    title: "Video 1",
    description: "Short looping sports clip",
  },
  {
    video: clip2, // or import and use clip2
    link: "https://google.com/",
    title: "Video 2",
    description: "Another dynamic card",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Item 4",
    description: "This is pretty cool, right?",
  },
];

const Achievements: React.FC = () => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <InfiniteMenu items={items} />
    </div>
  );
};

export default Achievements;
