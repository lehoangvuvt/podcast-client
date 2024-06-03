"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { Podcast } from "@/types/apiResponse";
import { twMerge } from "tailwind-merge";

type Props = {
  podcast: Podcast;
  width?: string;
};

const PodcastItem: React.FC<Props> = ({ podcast, width = "20%" }) => {
  const { pushRouteWithHistory } = useCustomRouter();
  return (
    <div
      onClick={() => pushRouteWithHistory(`/home/podcasts/${podcast.uuid}`)}
      className={twMerge(
        "aspect-square",
        "font-bold",
        "text-[20px]",
        "cursor-pointer",
        "transition-all",
        "hover:brightness-75",
        "overflow-hidden"
      )}
      style={{
        width: width,
        backgroundImage: `url("${podcast.thumbnail_url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className={twMerge(
          "w-full",
          "bg-[rgba(0,0,0,0.2)]",
          "text-[rgba(255,255,255,0.85)]",
          "text-[16px]",
          "backdrop-blur-sm",
          "py-[5px]",
          "px-[8px]"
        )}
      >
        {podcast.podcast_name}
      </div>
    </div>
  );
};

export default PodcastItem;
