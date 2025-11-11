import { useEffect, useRef } from "react";
import { Button } from "antd";
import { RiArrowGoBackFill } from "react-icons/ri";

const ROTATE_SPEED = 0.25;
const SWAP_ANGLE = 90;

interface IProps {
  imageData: string[];
  setImageData: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
  setShowGallery: React.Dispatch<React.SetStateAction<boolean>>
}

const PhotoRoom: React.FC<IProps> = ({ imageData, setImageData, children, setShowGallery }) => {
  const el = useRef<HTMLDivElement>(null);

  // requestAnimationFrame handler
  const animId = useRef<number>(0);

  // Transition states variables
  let currentAngle: number,
    swapIndex: number,
    nextIndex: number,
    nextAngle: number;

  useEffect(() => {
    // Reset current state angles
    currentAngle = 0;
    nextAngle = SWAP_ANGLE;

    // Construct wall items
    const walls = el.current!.children;

    for (let i = 0; i < 4; i++) {
      const wall = walls[i];

      // Create wall item
      if (wall.children.length == 0) {
        const item = document.createElement("div") as HTMLDivElement;
        item.className = "wall-item";
        wall.appendChild(item);
      }
      // Apply image background
      const item = wall.firstChild as HTMLDivElement;
      item.style.backgroundImage = `url(${imageData[i]})`;
    }

    // Track current wall to be swapped
    swapIndex = 0;
    // Track the next image in imageData
    nextIndex = 4;

    // Remove previous requestAnimationFrame
    cancelAnimationFrame(animId.current);

    // Rotate the room
    const updateFrame = () => {
      // Ignore empty data
      if (imageData.length == 0) return;

      // Rotate the room
      currentAngle += ROTATE_SPEED;
      el.current!.style.transform = `translateZ(-100px) rotateY(${currentAngle}deg)`;

      // Swap wall image on checked angle
      if (currentAngle >= nextAngle) {
        nextAngle += SWAP_ANGLE;
        const theWall = walls[swapIndex].firstChild as HTMLDivElement;
        theWall.style.backgroundImage = `url(${imageData[nextIndex]})`;

        // Increase indexes on every SWAP_ANGLE
        swapIndex++;
        nextIndex++;
        if (swapIndex >= 4) swapIndex = 0;
        if (nextIndex >= imageData.length) nextIndex = 0;
      }
      animId.current = requestAnimationFrame(updateFrame);
    };
    updateFrame();
  }, [imageData]);

  return (
    <div className="container">
      <Button onClick={() => setShowGallery(false)} className="absolute top-6 left-6 z-90">
        <RiArrowGoBackFill />
        Ortga
      </Button>
      <div className="absolute top-4 left-[50%] translate-x-[-50%] z-90">
        {children}
      </div>
      <div className="photo-room" ref={el}>
        <div className="room-wall back-wall"></div>
        <div className="room-wall right-wall"></div>
        <div className="room-wall front-wall"></div>
        <div className="room-wall left-wall"></div>
        <div className="room-wall top-wall"></div>
        <div className="room-wall bottom-wall"></div>
      </div>
    </div>
  );
};

export default PhotoRoom;
