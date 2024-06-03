import EpisodeItem from "@/components/EpisodeItem";
import PodcastsService from "@/services/podcasts.service";

const PodcastDetails = async ({ params }: { params: { uuid: string } }) => {
  const response = await PodcastsService.GetPodcastDetails(params.uuid);
  if (response.status === "fail") return <h1>Not found...</h1>;
  const details = response.data.podcast_details;
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
        className="w-full h-[300px]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
          backgroundImage: `url("${details.thumbnail_url}")`,
        }}
      ></div>
      <div className="w-full flex flex-col gap-[10px] pt-[20px] pr-[15px]">
        {details.episodes?.length > 0 &&
          details.episodes.map((ep, _) => (
            <EpisodeItem
              key={ep.id}
              episode={ep}
              thumbnailURL={details.thumbnail_url}
            />
          ))}
      </div>
    </div>
  );
};

export default PodcastDetails;
