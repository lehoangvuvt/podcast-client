"use client";

import { Podcast, PodcastDetails, PodcastEpisode } from "@/types/apiResponse";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useCustomRouter from "@/hooks/useCustomRouter";
import AudioPlayButton from "../AudioPlayButton";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { routes } from "@/config/routes";

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
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`${routes.EPISODES}/${episode.uuid}`);
  }, [episode, router]);

  return (
    <div
      onClick={() => pushRouteWithHistory(`${routes.EPISODES}/${episode.uuid}`)}
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}
      className={twMerge(
        "w-full",
        "flex flex-col",
        "py-[20px] px-[30px]",
        "cursor-pointer",
        "transition-all",
        "bg-[white]",
        "hover:brightness-90"
      )}
    >
      <div
        className={twMerge("w-full", "flex flex-row gap-[10px]")}
        key={episode.id}
      >
        <div className="h-[120px] w-[120px] rounded-md relative">
          <Image
            src={
              podcastDetails
                ? podcastDetails.thumbnail_url
                : podcast
                ? podcast.thumbnail_url
                : ""
            }
            alt={episode.uuid + "_thumbnail"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex-1 flex-col pl-[15px]">
          <div
            className={twMerge(
              "w-full",
              "text-[#121212]",
              "font-bold",
              "text-[1.1rem]"
            )}
          >
            {episode.episode_name}
          </div>
          <div
            className={twMerge(
              "w-full",
              "text-[rgba(0,0,0,0.7)]",
              "font-semibold",
              "text-[0.9rem]",
              "pt-[5px]"
            )}
          >
            <div
              style={{
                width: "80%",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              {episode.episode_desc}
            </div>
          </div>
          <div className="text-[#121212)] text-[0.8rem] font-semibold pt-[10px]">
            {moment(episode.created_at).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
      {podcastDetails && (
        <div
          className={twMerge(
            "w-full",
            "h-[80px]",
            "flex flex-row",
            "items-center",
            "justify-end"
          )}
        >
          <AudioPlayButton
            episode={{ mode: "PLAYLIST", details: episode }}
            podcastDetails={podcastDetails}
          />
        </div>
      )}
    </div>
  );
};

export default EpisodeItem;
