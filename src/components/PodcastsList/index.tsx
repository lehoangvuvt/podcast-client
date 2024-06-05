"use client";

import { useEffect, useState } from "react";
import { Podcast } from "@/types/apiResponse";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PodcastsService from "@/services/podcasts.service";
import PodcastItem from "../PodcastItem";

type Props = {
  externalData?: Podcast[] | null;
};

const PodcastsList: React.FC<Props> = ({ externalData = null }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>(externalData ?? []);
  const [isLoading, setLoading] = useState(externalData ? false : true);

  useEffect(() => {
    if (externalData) return;
    const getAllPodcasts = async () => {
      const response = await PodcastsService.GetAllPodcasts();
      if (response.status === "success") {
        setPodcasts(response.data.podcasts);
      }
      setLoading(false);
    };
    getAllPodcasts();
  }, [externalData]);

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] px-[15px]">
      {isLoading &&
        Array(10)
          .fill("")
          .map((_, i) => (
            <MySkeleton shape={SHAPE_ENUMS.SQUARE} key={i} width="20%" />
          ))}
      {!isLoading &&
        podcasts?.length > 0 &&
        podcasts.map((podcast) => (
          <PodcastItem width={"20%"} key={podcast.id} podcast={podcast} />
        ))}
    </div>
  );
};

export default PodcastsList;
