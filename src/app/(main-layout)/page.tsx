"use client";

import EpisodeItem from "@/components/EpisodeItem";
import PodcastItem from "@/components/PodcastItem";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import useHomeFeeds from "@/react-query/hooks/useHomeFeeds";
import { twMerge } from "tailwind-merge";

const HomePage = () => {
  const { result, isLoading } = useHomeFeeds();

  return (
    <div className="w-full flex flex-wrap flex-col pb-[50px] pt-[30px]">
      {isLoading ? (
        <div className="w-full mt-[0px] px-[15px] flex flex-row flex-wrap gap-[10px]">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <MySkeleton
                shape={SHAPE_ENUMS.CUSTOM}
                customRatio={3.5 / 1}
                key={i}
                width="100%"
              />
            ))}
        </div>
      ) : (
        <div className="w-full">
          {result && result.podcasts && result.podcasts.length > 0 && (
            <div className="w-full flex flex-col">
              <div
                className={twMerge(
                  "w-full",
                  "text-[rgba(0,0,0,0.8)] text-[2.2rem] font-extrabold uppercase",
                  "px-[25px] pt-[15px] pb-[30px]",
                  "leading-10"
                )}
              >
                Popular
                <br />
                Podcasts
              </div>
              <div className="w-full flex flex-col flex-wrap gap-[20px] px-[20px]">
                {result.podcasts.map((podcastDetails, i) => (
                  <div
                    key={podcastDetails.id}
                    className="w-[90%] flex flex-row justify-between pb-[40px]"
                  >
                    <div className="w-[33%] flex flex-col items-start">
                      <PodcastItem
                        key={podcastDetails.id}
                        podcast={podcastDetails}
                        width="100%"
                      />
                      <div className="w-full text-[0.9rem] font-semibold text-[rgba(0,0,0,0.6)] px-[15px] -mt-[15px]">
                        {podcastDetails.episodes.length} episodes
                      </div>
                      <div className="w-full text-[0.9rem] font-semibold text-[rgba(0,0,0,0.6)] px-[15px] mt-[10px]">
                        {podcastDetails.podcast_desc.length <= 150
                          ? podcastDetails.podcast_desc
                          : `${podcastDetails.podcast_desc.substring(
                              0,
                              150
                            )}...`}
                      </div>
                    </div>
                    <div className="w-[55%] flex flex-col">
                      {podcastDetails.episodes.length > 0 &&
                        podcastDetails.episodes
                          .slice(0, 3)
                          .map((ep, i) => (
                            <EpisodeItem
                              key={ep.id}
                              episode={ep}
                              podcastDetails={podcastDetails}
                              homeFeedMode
                            />
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
