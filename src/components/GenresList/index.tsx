"use client";

import { useEffect, useState } from "react";
import { Genre } from "@/types/apiResponse";
import GenresService from "@/services/genres.service";
import GenreItem from "../GenreItem";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";

const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getAllGenres = async () => {
      const response = await GenresService.GetAllGenres();
      if (response.status === "success") {
        setGenres(response.data.genres);
      }
      setLoading(false);
    };
    getAllGenres();
  }, []);

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] p-[15px]">
      {isLoading &&
        Array(10)
          .fill("")
          .map((_, i) => (
            <MySkeleton shape={SHAPE_ENUMS.RECTANGLE} key={i} width="24%" />
          ))}
      {!isLoading &&
        genres?.length > 0 &&
        genres.map((genre) => (
          <GenreItem width="24%" key={genre.id} genre={genre} />
        ))}
    </div>
  );
};

export default GenresList;
