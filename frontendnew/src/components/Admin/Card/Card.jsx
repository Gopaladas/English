import React, { useState } from "react";
import "./Card.css";

const Card = ({ title, content, imgSrc }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <div class="book  m-auto">
      <div class="p-8">
        <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 ">
          {title}
        </h5>
        <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {content}
        </p>
      </div>

      <div class="cover">
        <img className="h-full w-full" src={imgSrc} />
      </div>
    </div>
  );
};

export default Card;
