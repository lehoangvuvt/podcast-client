"use client";

import { Genre } from "@/types/apiResponse";
import { twMerge } from "tailwind-merge";

type Props = {
  genre: Genre;
  width?: string;
};

const GenreItem: React.FC<Props> = ({ genre, width = "20%" }) => {
  return (
    <div
      className={twMerge(
        "aspect-video",
        "font-bold",
        "text-[20px]",
        "cursor-pointer",
        "transition-all",
        "hover:brightness-75",
        "overflow-hidden"
      )}
      style={{
        width: width,
        backgroundImage: `url("${genre.bg_image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className={twMerge(
          "w-full",
          "bg-[rgba(0,0,0,0.2)]",
          "text-[rgba(255,255,255,0.85)]",
          "text-[16px]",
          "backdrop-blur-sm",
          "py-[5px]",
          "px-[8px]"
        )}
      >
        {genre.genre_name}
      </div>
    </div>
  );
};

export default GenreItem;
