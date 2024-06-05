"use client";

import withAuth from "@/HOC/withAuth";
import EpisodeItem from "@/components/EpisodeItem";
import useCustomRouter from "@/hooks/useCustomRouter";
import { State } from "@/redux/store";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const FavouritesEpisodes = () => {
  const userSlice = useSelector((state: State) => state.user);
  const headerColor = "#FF80AB";
  const { pushRouteWithHistory } = useCustomRouter();

  return (
    <div
      style={{
        marginTop: "-95px",
        zIndex: 99,
        position: "absolute",
      }}
      className="w-full flex flex-col"
    >
      <div
        className="w-full h-[250px] flex flex-row items-center p-[30px] gap-[30px]"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `linear-gradient(to bottom, ${headerColor} 10%, black)`,
        }}
      >
        <div
          className={twMerge(
            "text-[white] font-extrabold text-[4em] px-[20px]"
          )}
        >
          Favourite Episodes
        </div>
      </div>
      <div className="w-full flex flex-col px-[5px] py-[5px]">
        {userSlice &&
          userSlice.userInfo &&
          userSlice.userInfo.favourite_episodes &&
          userSlice.userInfo.favourite_episodes.length > 0 &&
          userSlice.userInfo.favourite_episodes.map((episode, i) => (
            <div
              onClick={() =>
                pushRouteWithHistory(`/home/episodes/${episode.uuid}`)
              }
              className="w-full flex flex-row py-[20px] px-[30px] 
              cursor-pointer items-center font-semibold text-[16px] 
              hover:bg-[rgba(255,255,255,0.08)]
              rounded-sm
              "
              key={episode.id}
            >
              <div className="text-[rgba(255,255,255,0.5)] w-[40px]">
                {i + 1}
              </div>
              <div className="text-[rgba(255,255,255,0.9)] flex-1">
                {episode.episode_name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default withAuth(FavouritesEpisodes);
