"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { Podcast } from "@/types/apiResponse";
import moment from "moment";
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
      style={{
        width: width,
        display: "flex",
        flexFlow: "column wrap",
      }}
      className={twMerge(
        "rounded-sm",
        "cursor-pointer",
        "transition-all",
        "hover:bg-[rgba(255,255,255,0.1)]",
        "p-[10px]"
      )}
    >
      <div
        className={twMerge("aspect-square", "font-bold", "text-[20px]")}
        style={{
          width: "100%",
          backgroundImage: `url("${podcast.thumbnail_url}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="w-full flex flex-col px-[5px] py-[10px]">
        <div className="w-full text-[rgba(255,255,255,0.9)] font-semibold">
          {podcast.podcast_name}
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
