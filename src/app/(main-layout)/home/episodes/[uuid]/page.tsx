import EpisodesSevice from "@/services/episodes.service";
import EpisodeDetailsView from "./view";

const EpisodeDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await EpisodesSevice.GetEpisodeDetails(params.uuid);
  if (response.status === "fail") return <h1>Not found...</h1>;
  const episodeDetails = response.data.episode_details;
  return (
    <EpisodeDetailsView key={episodeDetails.id} details={episodeDetails} />
  );
};

export default EpisodeDetailsPage;
