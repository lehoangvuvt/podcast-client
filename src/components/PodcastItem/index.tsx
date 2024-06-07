"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { Podcast } from "@/types/apiResponse";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  podcast: Podcast;
  width?: string;
};

const PodcastItem: React.FC<Props> = ({ podcast, width = "20%" }) => {
  const { pushRouteWithHistory } = useCustomRouter();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/home/podcasts/${podcast.uuid}`);
  }, [podcast, router]);

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
        className={twMerge(
          "aspect-square",
          "font-bold",
          "text-[20px]",
          "relative",
          "w-full"
        )}
      >
        <Image
          src={podcast.thumbnail_url}
          alt={podcast.uuid + "_thumbnail"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="w-full flex flex-col px-[5px] py-[10px]">
        <div className="w-full text-[rgba(255,255,255,0.9)] text-[15px] font-semibold">
          {podcast.podcast_name}
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
