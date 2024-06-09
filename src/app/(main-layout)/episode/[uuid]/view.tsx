/* eslint-disable @next/next/no-img-element */
"use client";

import AddToFavButton from "@/components/AddToFavButton";
import AudioPlayButton from "@/components/AudioPlayButton";
import EpisodeItem from "@/components/EpisodeItem";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import useRelativeEpisodes from "@/react-query/hooks/useRelativeEpisodes";
import { PodcastEpisodeDetails } from "@/types/apiResponse";
import moment from "moment";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  details: PodcastEpisodeDetails;
};

const EpisodeDetailsView: React.FC<Props> = ({ details }) => {
  const thumbnailImgRef = useRef<HTMLImageElement>(null);
  const { episodes: relativeEps, isLoading: isLoadingRelativeEps } =
    useRelativeEpisodes(details.episode_no, details.podcast_id);

  return (
    <div
      style={{
        marginTop: "-55px",
        zIndex: 99,
        position: "absolute",
        background: "white",
      }}
      className="w-full flex flex-col pb-[100px]"
    >
      <div className="w-full flex flex-row items-center p-[30px]">
        <div className="w-[350px] h-[350px]">
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
        </div>

        <div className="h-full flex-1 flex flex-col pr-[80px] gap-[25px]">
          <div className="w-full text-[rgba(0,0,0,0.5)] font-medium text-[0.95rem]">
            {moment(details.created_at).format("DD/MM/YYYY")}
          </div>

          <div className="w-full text-[#121212] font-semibold text-[2.4rem]">
            {details?.episode_name}
          </div>

          <div className="w-full pl-[20px] flex flex-row gap-[20px]">
            <AudioPlayButton episode={{ mode: "SINGLE", details }} />
            <AuthConditionalRenderWrapper required>
              <AddToFavButton type="episode" itemId={details.id} />
            </AuthConditionalRenderWrapper>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div
          className={twMerge(
            "w-full",
            "text-[rgba(0,0,0,0.8)] text-[2rem] font-extrabold uppercase",
            "px-[25px] pt-[20px] pb-[30px]",
            "leading-10"
          )}
        >
          Episode content
        </div>
        <div
          className={twMerge(
            "w-[75%]",
            "px-[25px]",
            "pb-[20px]",
            "text-[rgba(0,0,0,0.8)] text-[0.98rem] font-medium"
          )}
        >
          {details.episode_desc}
        </div>

        {isLoadingRelativeEps ||
          (relativeEps && relativeEps?.length > 0 && (
            <div
              className={twMerge(
                "w-full",
                "text-[rgba(0,0,0,0.8)] text-[2rem] font-extrabold uppercase",
                "px-[25px] pt-[30px] pb-[10px]",
                "leading-10"
              )}
            >
              Other episodes
            </div>
          ))}
        <div className="w-full flex flex-row flex-wrap p-[15px]">
          {isLoadingRelativeEps &&
            Array(10)
              .fill("")
              .map((_, i) => (
                <MySkeleton
                  shape={SHAPE_ENUMS.CUSTOM}
                  customRatio={5 / 1}
                  key={i}
                  width="100%"
                  style={{
                    marginTop: "15px",
                  }}
                />
              ))}
          {!isLoadingRelativeEps &&
            relativeEps &&
            relativeEps.length > 0 &&
            relativeEps.map((ep) => (
              <div key={ep.id} className="w-full">
                <EpisodeItem episode={ep} podcast={ep.podcast} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailsView;
