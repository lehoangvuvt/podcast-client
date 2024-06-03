"use client";

import {
  pauseAudio,
  playAudio,
  setCurrentEpisode,
} from "@/redux/slices/audioPlayerSlice";
import { State } from "@/redux/store";
import { PodcastDetails, PodcastEpisode } from "@/types/apiResponse";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

type Props = {
  podcastDetails: PodcastDetails;
  episode: PodcastEpisode;
};

const EpisodeItem: React.FC<Props> = ({ episode, podcastDetails }) => {
  const dispatch = useDispatch();
  const audioPlayerSlice = useSelector((state: State) => state.audioPlayer);

  return (
    <div
      className={twMerge(
        "w-full",
        "flex flex-col",
        "py-[20px] px-[30px]",
        "cursor-pointer",
        "transition-all",
        "hover:bg-[rgba(255,255,255,0.07)]"
      )}
    >
      <div
        className={twMerge("w-full", "flex flex-row gap-[10px]")}
        key={episode.id}
      >
        <div
          className="h-[120px] w-[120px] rounded-md"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${podcastDetails.thumbnail_url})`,
          }}
        />
        <div className="flex-1 flex-col pl-[15px]">
          <div
            className={twMerge(
              "w-full",
              "text-[rgba(255,255,255,0.95)]",
              "font-medium",
              "text-[15px]"
            )}
          >
            {episode.episode_name}
          </div>
          <div
            className={twMerge(
              "w-full",
              "text-[rgba(255,255,255,0.65)]",
              "font-medium",
              "text-[14px]",
              "pt-[5px]"
            )}
          >
            {episode.episode_desc}
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "w-full",
          "h-[80px]",
          "flex flex-row",
          "items-center",
          "justify-end"
        )}
      >
        <button
          onClick={() => {
            if (
              audioPlayerSlice.currentPodcast?.episodes.find(
                (ele) => ele.episode_no === audioPlayerSlice.currentEpisodeNo
              )?.uuid === episode.uuid
            ) {
              switch (audioPlayerSlice.playerState) {
                case "PLAYING":
                  dispatch(pauseAudio());
                  break;
                case "PAUSED":
                  dispatch(playAudio());
                  break;
                case "STOP":
                  dispatch(
                    setCurrentEpisode({
                      episodeNo: episode.episode_no,
                      podcastDetails,
                    })
                  );
                  dispatch(playAudio());
                  break;
              }
            } else {
              dispatch(
                setCurrentEpisode({
                  episodeNo: episode.episode_no,
                  podcastDetails,
                })
              );
              dispatch(playAudio());
            }
          }}
          className={twMerge(
            "rounded-full",
            "w-[35px]",
            "h-[35px]",
            "bg-[white]",
            "flex",
            "items-center",
            "justify-center",
            "cursor-pointer"
          )}
        >
          {audioPlayerSlice.currentPodcast?.episodes.find(
            (ele) => ele.episode_no === audioPlayerSlice.currentEpisodeNo
          )?.uuid === episode.uuid &&
          audioPlayerSlice.playerState === "PLAYING" ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default EpisodeItem;
