"use client";

import EpisodeItem from "@/components/EpisodeItem";
import PodcastItem from "@/components/PodcastItem";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import { routes } from "@/config/routes";
import useSearchItems from "@/react-query/hooks/useSearchItems";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dbTimeout = useRef<any>(null);
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const { result, isLoading } = useSearchItems(q);

  useEffect(() => {
    if (dbTimeout && dbTimeout.current) {
      clearTimeout(dbTimeout.current);
    }

    dbTimeout.current = setTimeout(() => {
      if (q.trim().length === 0) {
        window.history.replaceState({}, "", routes.SEARCH);
        return;
      }
      window.history.replaceState({}, "", `${routes.SEARCH}?q=${q}`);
    }, 300);
  }, [q]);

  return (
    <div className="w-full flex flex-wrap flex-col">
      <div
        style={{
          backgroundColor: "#121212",
          backgroundImage:
            "linear-gradient(to left, #121212, rgba(255,255,255,0.05))",
          boxSizing: "border-box",
        }}
        className="fixed w-[70%] top-[60px] h-[80px] pl-[20px] flex items-center z-[100]  "
      >
        <input
          className={twMerge(
            "w-[40%] h-[45px]",
            "bg-[#2a2a2a]",
            "text-[white]",
            "text-[16px]",
            "rounded-3xl",
            "outline-none",
            "px-[20px]",
            "placeholder-[rgba(255,255,255,0.4)]"
          )}
          placeholder="Search podcasts, episodes, genres..."
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="w-full mt-[80px] text-[red] flex flex-row flex-wrap gap-[10px]">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <MySkeleton shape={SHAPE_ENUMS.SQUARE} key={i} width="19%" />
            ))}
        </div>
      ) : (
        <div className="w-full mt-[80px]">
          {result && result.podcasts && result.podcasts.length > 0 && (
            <div className="w-full flex flex-col">
              <div
                className={twMerge(
                  "w-full",
                  "text-[white] text-[24px] font-bold",
                  "px-[15px] pt-[15px] pb-[15px]"
                )}
              >
                Podcasts
              </div>
              <div className="w-full flex flex-row flex-wrap gap-[10px] px-[20px]">
                {result.podcasts.map((podcast) => (
                  <PodcastItem key={podcast.id} podcast={podcast} width="19%" />
                ))}
              </div>
            </div>
          )}
          {result && result.episodes && result.episodes.length > 0 && (
            <div className="w-full flex flex-col">
              <div
                className={twMerge(
                  "w-full",
                  "text-[white] text-[24px] font-bold",
                  "px-[15px] pt-[15px] pb-[10px]"
                )}
              >
                Episodes
              </div>
              <div className="w-full flex flex-col">
                {result.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="w-full"
                    style={{ textOverflow: "ellipsis" }}
                  >
                    <EpisodeItem episode={ep} podcast={ep.podcast} />
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

export default SearchPage;
