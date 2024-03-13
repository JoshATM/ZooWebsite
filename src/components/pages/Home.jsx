import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Flamingos from "../../assets/Flamingos.mp4";
import Gazell from "../../assets/Gazell.mp4";
import Monkey from "../../assets/Monkey.mp4";
import Penguin from "../../assets/Penguin.mp4";
import Waterfall from "../../assets/Waterfall.mp4";

export default function Home() {
  const videoSources = [Flamingos, Gazell, Monkey, Penguin, Waterfall];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef();

  const handleVideoEnd = () => {
    setIsVisible(false); // Hide the video before changing the source
    setTimeout(() => {
      setCurrentVideoIndex((currentVideoIndex + 1) % videoSources.length);
    }, 500); // Delay changing the source until the fade-out effect completes
  };

  useEffect(() => {
    videoRef.current.src = videoSources[currentVideoIndex];
    setIsVisible(true);
    videoRef.current.play();
  }, [currentVideoIndex]);

  return (
    <HomeContainer>
      <StyledVideoBanner
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        visible={isVisible ? 1 : 0} // Pass visibility state to the styled component
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
      </StyledVideoBanner>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  text-align: center;
`;

const StyledVideoBanner = styled.video`
  width: 100%;
  height: 550px;
  object-fit: cover;
  opacity: ${(props) => props.visible};
  transition: opacity 0.5s;

  /* Fade-in effect */
  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
  }

  /* Fade-out effect */
  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
  }
`;
