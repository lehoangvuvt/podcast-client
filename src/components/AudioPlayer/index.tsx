"use client";

import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { State } from "@/redux/store";
import { useEffect, useRef } from "react";

const CustomAudioPlayer = styled(AudioPlayer)`
  .rhap_current-time,
  .rhap_total-time {
    color: white;
    font-size: 14px;
  }
`;

const MyAudioPlayer = () => {
  const audioPlayerRef = useRef<AudioPlayer>(null);
  const audioPlayerSlice = useSelector((state: State) => state.audioPlayer);

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
    }
  }, []);

  return (
    <CustomAudioPlayer
      autoPlay={false}
      ref={audioPlayerRef}
      src={audioPlayerSlice.currentEpisode?.source_url ?? ""}
      onPlay={(e) => console.log("onPlay")}
      style={{
        background: "transparent",
        color: "white !important",
        width: "65%",
      }}
    />
  );
};

export default MyAudioPlayer;
