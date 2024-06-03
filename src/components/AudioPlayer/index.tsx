"use client";

import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { State } from "@/redux/store";
import { useEffect, useRef } from "react";
import useCustomRouter from "@/hooks/useCustomRouter";

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
  const { pushRouteWithHistory } = useCustomRouter();

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
    }
  }, []);

  useEffect(() => {
    switch (audioPlayerSlice.playerState) {
      case "PAUSED":
        pauseAudio();
        break;
      case "PLAYING":
        playAudio();
        break;
    }
  }, [audioPlayerSlice]);

  const pauseAudio = () => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.pause();
    }
  };

  const playAudio = () => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.play();
    }
  };

  return (
    <div className="w-full h-full flex flex-row items-center">
      <div className="w-[22%] h-full flex flex-row gap-[20px] items-center p-[20px]">
        <div
          className="w-[55px] h-[55px]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${
              audioPlayerSlice.currentPodcast?.thumbnail_url ?? ""
            })`,
          }}
        />
        <div className="flex flex-col flex-1">
          <div className="text-[rgba(255,255,255,0.95)] text-[14px] font-medium">
            {audioPlayerSlice.currentPodcast?.episodes.find(
              (ele) => ele.episode_no === audioPlayerSlice.currentEpisodeNo
            )?.episode_name ?? ""}
          </div>
          <div
            onClick={() =>
              pushRouteWithHistory(
                `/home/podcasts/${audioPlayerSlice.currentPodcast?.uuid}`
              )
            }
            className="text-[rgba(255,255,255,0.65)] text-[13px] font-medium cursor-pointer hover:underline"
          >
            {audioPlayerSlice.currentPodcast?.podcast_name ?? ""}
          </div>
        </div>
      </div>
      <CustomAudioPlayer
        autoPlay={false}
        ref={audioPlayerRef}
        src={
          audioPlayerSlice.currentPodcast
            ? audioPlayerSlice.currentPodcast.episodes.find(
                (ele) => ele.episode_no === audioPlayerSlice.currentEpisodeNo
              )?.source_url
            : ""
        }
        onPlay={(e) => console.log("onPlay")}
        style={{
          background: "transparent",
          color: "white !important",
          width: "56%",
        }}
      />
      <div className="w-[22%]"></div>
    </div>
  );
};

export default MyAudioPlayer;
