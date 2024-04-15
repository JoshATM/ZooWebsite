import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Flamingos from "../../assets/videos/Flamingos.mp4";
import Gazell from "../../assets/videos/Gazell.mp4";
import Monkey from "../../assets/videos/Monkey.mp4";
import Penguin from "../../assets/videos/Penguin.mp4";
import Waterfall from "../../assets/videos/Waterfall.mp4";

export default function Home() {
  const videoSources = [Flamingos, Gazell, Monkey, Penguin, Waterfall];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef();

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentVideoIndex((currentVideoIndex + 1) % videoSources.length);
    }, 500);
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
        visible={isVisible ? 1 : 0}
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
