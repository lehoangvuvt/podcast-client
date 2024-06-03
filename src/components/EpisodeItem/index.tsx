"use client";

import { setCurrentEpisode } from "@/redux/slices/audioPlayerSlice";
import { PodcastEpisode } from "@/types/apiResponse";
import React from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

type Props = {
  thumbnailURL: string;
  episode: PodcastEpisode;
};

const EpisodeItem: React.FC<Props> = ({ episode, thumbnailURL }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setCurrentEpisode(episode))}
      className={twMerge(
        "w-full",
        "flex flex-row gap-[10px]",
        "py-[20px] px-[30px]",
        "cursor-pointer",
        "transition-all",
        "hover:bg-[rgba(255,255,255,0.07)]"
      )}
      key={episode.id}
    >
      <div
        className="h-[120px] w-[120px] rounded-md"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${thumbnailURL})`,
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
  );
};

export default EpisodeItem;
