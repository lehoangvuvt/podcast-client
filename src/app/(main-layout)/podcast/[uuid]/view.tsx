/* eslint-disable @next/next/no-img-element */
"use client";

import EpisodeItem from "@/components/EpisodeItem";
import SocialBar from "@/components/SocialBar";
import { PodcastDetails } from "@/types/apiResponse";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  details: PodcastDetails;
};

const PodcastDetailsView: React.FC<Props> = ({ details }) => {
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
        marginTop: "-55px",
        zIndex: 99,
        position: "absolute",
      }}
      className="w-full flex flex-col"
    >
      <div
        className="w-full flex flex-row flex-wrap items-center p-[30px] gap-[30px]"
        style={{
          backgroundAttachment: "fixed",
          aspectRatio: 25 / 9,
          backgroundImage: `linear-gradient(to bottom, ${dominantColor} 10%, black)`,
        }}
      >
        <img
          className="h-[200px] w-[200px] rounded-[5px] shadow-xl"
          crossOrigin="anonymous"
          ref={thumbnailImgRef}
          src={details.thumbnail_url}
          alt="thumbnail-image"
        />
        <div className="h-full flex-1 flex flex-col justify-center">
          <div className="text-[white] font-bold text-[45px]">
            {details?.podcast_name}
          </div>
          <div className="w-full -ml-[15px] pt-[5px]">
            <SocialBar
              fontSize="0.8rem"
              color="rgba(255,255,255,0.95)"
              itemURL={window.location.href}
            />
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "w-full",
          "text-[rgba(0,0,0,0.8)] text-[2rem] font-extrabold uppercase",
          "px-[25px] pt-[25px]",
          "leading-10"
        )}
      >
        Introduce
      </div>
      <div
        className={twMerge(
          "w-[100%]",
          "text-[rgba(0,0,0,0.7)] text-[1rem] font-medium",
          "pl-[25px] pr-[200px] pt-[25px] pb-[30px]"
        )}
      >
        {details.podcast_desc}
      </div>
      <div
        className={twMerge(
          "w-full",
          "text-[rgba(0,0,0,0.8)] text-[2rem] font-extrabold uppercase",
          "px-[25px] pt-[20px] pb-[30px]",
          "leading-10"
        )}
      >
        {details.episodes.length} Episodes
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,${dominantColor}, 0.1%, black)`,
        }}
        className="w-full flex flex-col"
      >
        {details.episodes?.length > 0 &&
          details.episodes.map((ep, _) => (
            <EpisodeItem key={ep.id} episode={ep} podcastDetails={details} />
          ))}
      </div>
    </div>
  );
};

export default PodcastDetailsView;
