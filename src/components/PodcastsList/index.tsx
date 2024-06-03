"use client";

import { useEffect, useState } from "react";
import { Podcast } from "@/types/apiResponse";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PodcastsService from "@/services/podcasts.service";
import PodcastItem from "../PodcastItem";

const PodcastsList = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPodcasts = async () => {
      const response = await PodcastsService.GetAllPodcasts();
      if (response.status === "success") {
        setPodcasts(response.data.podcasts);
      }
      setLoading(false);
    };
    getAllPodcasts();
  }, []);

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] p-[15px]">
      {isLoading &&
        Array(10)
          .fill("")
          .map((_, i) => (
            <MySkeleton shape={SHAPE_ENUMS.SQUARE} key={i} width="18%" />
          ))}
      {!isLoading &&
        podcasts?.length > 0 &&
        podcasts.map((podcast) => (
          <PodcastItem width="18%" key={podcast.id} podcast={podcast} />
        ))}
    </div>
  );
};

export default PodcastsList;
