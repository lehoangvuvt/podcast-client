"use client";

import GenreItem from "../GenreItem";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import useGenres from "@/react-query/hooks/useGenres";

const GenresList = () => {
  const { genres, isLoading } = useGenres();

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] px-[15px]">
      {isLoading &&
        Array(10)
          .fill("")
          .map((_, i) => (
            <MySkeleton shape={SHAPE_ENUMS.RECTANGLE} key={i} width="23%" />
          ))}
      {!isLoading &&
        genres &&
        genres.length > 0 &&
        genres.map((genre) => (
          <GenreItem width="23%" key={genre.id} genre={genre} />
        ))}
    </div>
  );
};

export default GenresList;
