"use client";

import { Podcast, PodcastDetails, PodcastEpisode } from "@/types/apiResponse";
import React from "react";
import { twMerge } from "tailwind-merge";
import useCustomRouter from "@/hooks/useCustomRouter";
import AudioPlayButton from "../AudioPlayButton";
import moment from "moment";

type Props = {
  podcastDetails?: PodcastDetails;
  podcast?: Podcast;
  episode: PodcastEpisode;
};

const EpisodeItem: React.FC<Props> = ({
  episode,
  podcastDetails = null,
  podcast = null,
}) => {
  const { pushRouteWithHistory } = useCustomRouter();

  return (
    <div
      onClick={() => pushRouteWithHistory(`/home/episodes/${episode.uuid}`)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
      className={twMerge(
        "w-full",
        "flex flex-col",
        "py-[20px] px-[30px]",
        "cursor-pointer",
        "transition-all",
        "hover:bg-[rgba(255,255,255,0.1)]"
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
            backgroundImage: `url(${
              podcastDetails
                ? podcastDetails.thumbnail_url
                : podcast
                ? podcast.thumbnail_url
                : ""
            })`,
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
          <div className="text-[rgba(255,255,255,0.9)] text-[13px] font-semibold pt-[10px]">
            {moment(episode.created_at).format("DD/MM/YYYY")}
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
        {podcastDetails && (
          <AudioPlayButton
            episode={{ mode: "PLAYLIST", details: episode }}
            podcastDetails={podcastDetails}
          />
        )}
      </div>
    </div>
  );
};

export default EpisodeItem;
