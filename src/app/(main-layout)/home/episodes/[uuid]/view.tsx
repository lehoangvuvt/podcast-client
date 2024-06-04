/* eslint-disable @next/next/no-img-element */
"use client";

import AudioPlayButton from "@/components/AudioPlayButton";
import EpisodeItem from "@/components/EpisodeItem";
import { PodcastEpisodeDetails } from "@/types/apiResponse";
import { FastAverageColor } from "fast-average-color";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  details: PodcastEpisodeDetails;
};

const EpisodeDetailsView: React.FC<Props> = ({ details }) => {
  const thumbnailImgRef = useRef<HTMLImageElement>(null);
  const [dominantColor, setDominantColor] = useState("#111111");

  useEffect(() => {
    if (!thumbnailImgRef || !thumbnailImgRef.current) return;
    const getColor = async () => {
      if (!thumbnailImgRef || !thumbnailImgRef.current) return;
      const fac = new FastAverageColor();
      try {
        const color = await fac.getColorAsync(thumbnailImgRef.current);
        setDominantColor(color.hex);
      } catch (error) {
        console.log(error);
      }
    };
    getColor();
  }, []);

  return (
    <div
      style={{
        marginTop: "-95px",
        zIndex: 99,
        position: "absolute",
      }}
      className="w-full flex flex-col pb-[100px]"
    >
      <div
        className="w-full h-[300px] flex flex-row items-center p-[30px] gap-[30px]"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `linear-gradient(to bottom, ${dominantColor} 10%, black)`,
        }}
      >
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="h-[85%] aspect-square rounded-[5px] shadow-xl"
          crossOrigin="anonymous"
          ref={thumbnailImgRef}
          src={details.podcast.thumbnail_url}
          alt="thumbnail-image"
        />
        <div className="h-full flex-1 flex flex-col justify-center">
          <div className="text-[white] font-bold text-[45px]">
            {details?.episode_name}
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "w-[80%]",
          "px-[20px] pt-[20px]",
          "text-[rgba(255,255,255,0.7)] text-[13px] font-medium"
        )}
      >
        {moment(details.created_at).format("DD/MM/YYYY")}
      </div>
      <div className="w-full pt-[20px] pl-[20px]">
        <AudioPlayButton episode={{ mode: "SINGLE", details }} />
      </div>
      <div
        className={twMerge(
          "w-full",
          "p-[20px]",
          "text-[white] text-[22px] font-bold"
        )}
      >
        Description
      </div>
      <div
        className={twMerge(
          "w-[75%]",
          "px-[20px]",
          "text-[rgba(255,255,255,0.7)] text-[14px] font-medium"
        )}
      >
        {details.episode_desc}
      </div>
    </div>
  );
};

export default EpisodeDetailsView;
