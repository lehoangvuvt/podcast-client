"use client";

import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store";
import { useEffect, useRef } from "react";
import useCustomRouter from "@/hooks/useCustomRouter";
import {
  pauseAudio,
  playAudio,
  playNext,
  playPrev,
} from "@/redux/slices/audioPlayerSlice";

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
  const dispatch = useDispatch();
  const { pushRouteWithHistory } = useCustomRouter();

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
    }
  }, []);

  useEffect(() => {
    switch (audioPlayerSlice.playerState) {
      case "PAUSED":
        handlePauseAudio();
        break;
      case "PLAYING":
        handlePlayAudio();
        break;
      case "STOP":
        handleStopAudio();
        break;
    }
  }, [audioPlayerSlice]);

  const handleStopAudio = () => {
    if (
      audioPlayerRef &&
      audioPlayerRef.current &&
      audioPlayerRef.current.audio.current
    ) {
      audioPlayerRef.current.audio.current.pause();
      audioPlayerRef.current.audio.current.currentTime = 0;
    }
  };

  const handlePauseAudio = () => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.pause();
    }
  };

  const handlePlayAudio = () => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.play();
    }
  };

  const handleOnPause = () => {
    dispatch(pauseAudio());
  };

  const handleOnPlaying = () => {
    dispatch(playAudio());
  };

  const handleOnEnded = () => {
    if (audioPlayerSlice.mode === "PLAYLIST") {
      dispatch(playNext());
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
            backgroundImage:
              audioPlayerSlice.mode === "PLAYLIST"
                ? `url(${
                    audioPlayerSlice.playList?.currentPodcast?.thumbnail_url ??
                    ""
                  })`
                : `url(${
                    audioPlayerSlice.single?.podcast.thumbnail_url ?? ""
                  })`,
          }}
        />
        <div className="flex flex-col flex-1">
          <div className="text-[rgba(255,255,255,0.95)] text-[14px] font-medium">
            {audioPlayerSlice.mode === "PLAYLIST"
              ? audioPlayerSlice.playList?.currentPodcast?.episodes.find(
                  (ele) =>
                    ele.episode_no ===
                    audioPlayerSlice.playList?.currentEpisodeNo
                )?.episode_name ?? ""
              : audioPlayerSlice.single?.episode_name ?? ""}
          </div>
          <div
            onClick={() =>
              pushRouteWithHistory(
                audioPlayerSlice.mode === "PLAYLIST"
                  ? `/home/podcasts/${audioPlayerSlice.playList?.currentPodcast?.uuid}`
                  : `/home/podcasts/${audioPlayerSlice.single?.podcast.uuid}`
              )
            }
            className="text-[rgba(255,255,255,0.65)] text-[13px] font-medium cursor-pointer hover:underline"
          >
            {audioPlayerSlice.mode === "PLAYLIST"
              ? audioPlayerSlice.playList?.currentPodcast?.podcast_name ?? ""
              : audioPlayerSlice.single?.podcast.podcast_name ?? ""}
          </div>
        </div>
      </div>
      <CustomAudioPlayer
        showSkipControls
        showJumpControls={false}
        onPause={handleOnPause}
        onPlaying={handleOnPlaying}
        onEnded={handleOnEnded}
        onClickPrevious={() => dispatch(playPrev())}
        onClickNext={() => dispatch(playNext())}
        autoPlay={false}
        ref={audioPlayerRef}
        src={
          audioPlayerSlice.mode === "PLAYLIST"
            ? audioPlayerSlice.playList?.currentPodcast
              ? audioPlayerSlice.playList?.currentPodcast.episodes.find(
                  (ele) =>
                    ele.episode_no ===
                    audioPlayerSlice.playList?.currentEpisodeNo
                )?.source_url
              : ""
            : audioPlayerSlice.single?.source_url ?? ""
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
