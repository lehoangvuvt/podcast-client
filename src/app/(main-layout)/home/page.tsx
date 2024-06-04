"use client";

import EpisodeItem from "@/components/EpisodeItem";
import PodcastItem from "@/components/PodcastItem";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import HomeService from "@/services/home.service";
import { SearchResult } from "@/types/apiResponse";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const HomePage = () => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getNewFeeds = async () => {
      const response = await HomeService.GetHomeFeeds();
      if (response.status === "success") {
        setResult(response.data);
      } else {
        setResult(null);
      }
      setLoading(false);
    };
    getNewFeeds();
  }, []);

  return (
    <div className="w-full flex flex-wrap flex-col">
      {isLoading ? (
        <div className="w-full mt-[0px] text-[red] px-[15px] flex flex-row flex-wrap gap-[10px]">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <MySkeleton shape={SHAPE_ENUMS.SQUARE} key={i} width="19%" />
            ))}
        </div>
      ) : (
        <div className="w-full">
          {result && result.episodes && result.episodes.length > 0 && (
            <div className="w-full flex flex-col">
              <div
                className={twMerge(
                  "w-full",
                  "text-[white] text-[24px] font-bold",
                  "px-[15px] pt-[0px] pb-[10px]"
                )}
              >
                Newest Episodes
              </div>
              <div className="w-full flex flex-col">
                {result.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="w-[99%] h-[200px] overflow-hidden"
                  >
                    <EpisodeItem episode={ep} podcast={ep.podcast} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {result && result.podcasts && result.podcasts.length > 0 && (
            <div className="w-full flex flex-col">
              <div
                className={twMerge(
                  "w-full",
                  "text-[white] text-[24px] font-bold",
                  "px-[15px] pt-[15px] pb-[15px]"
                )}
              >
                Newest Podcasts
              </div>
              <div className="w-full flex flex-row flex-wrap gap-[10px] px-[20px]">
                {result.podcasts.map((podcast) => (
                  <PodcastItem key={podcast.id} podcast={podcast} width="19%" />
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
