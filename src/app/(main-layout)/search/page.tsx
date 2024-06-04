"use client";

import EpisodeItem from "@/components/EpisodeItem";
import PodcastItem from "@/components/PodcastItem";
import useCustomRouter from "@/hooks/useCustomRouter";
import SearchService from "@/services/search.service";
import { SearchResult } from "@/types/apiResponse";
import { useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dbTimeout = useRef<any>(null);
  const [q, setQ] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const { pushRouteWithHistory } = useCustomRouter();

  const search = useCallback(async (value: string) => {
    const response = await SearchService.SearchItems(value);
    if (response.status === "success") {
      setResult(response.data.result);
    }
  }, []);

  useEffect(() => {
    if (
      searchParams &&
      searchParams.has("q") &&
      typeof searchParams.get("q") === "string"
    ) {
      setQ(searchParams.get("q") as string);
    } else {
      setQ("");
      setResult(null);
    }
  }, [searchParams]);

  useEffect(() => {
    if (dbTimeout && dbTimeout.current) {
      clearTimeout(dbTimeout.current);
    }

    dbTimeout.current = setTimeout(() => {
      if (q.trim().length === 0) {
        pushRouteWithHistory(`/search`);
        return;
      }
      pushRouteWithHistory(`/search?q=${q}`);
    }, 250);
  }, [q]);

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (!qParam || qParam.trim().length === 0) {
      setResult(null);
      return;
    }
    search(qParam);
  }, [searchParams, search]);

  return (
    <div className="w-full flex flex-col">
      <div
        style={{
          backgroundColor: "#121212",
          backgroundImage:
            "linear-gradient(to left, #121212, rgba(255,255,255,0.05))",
        }}
        className="fixed w-full top-[60px] h-[80px] pl-[20px] flex items-center"
      >
        <input
          className={twMerge(
            "w-[30%] h-[45px]",
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
                  className="w-[99%] h-[200px] overflow-hidden"
                  style={{ textOverflow: "ellipsis" }}
                >
                  <EpisodeItem episode={ep} podcast={ep.podcast} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
