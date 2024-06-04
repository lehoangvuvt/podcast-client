import EpisodesSevice from "@/services/episodes.service";
import EpisodeDetailsView from "./view";

const EpisodeDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await EpisodesSevice.GetEpisodeDetails(params.uuid);
  if (response.status === "fail") return <h1>Not found...</h1>;
  return (
    <EpisodeDetailsView
      key={response.data.episode_details.id}
      details={response.data.episode_details}
    />
  );
};

export default EpisodeDetailsPage;
