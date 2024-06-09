import EpisodesSevice from "@/services/episodes.service";
import EpisodeDetailsView from "./view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await EpisodesSevice.GetEpisodeDetails(params.uuid);
  let title = "New Episode";
  let description = "My Episode description";
  let image = "";
  if (response.status === "success") {
    title = response.data.episode_details.episode_name;
    description = response.data.episode_details.episode_desc;
    image = response.data.episode_details.podcast.thumbnail_url;
  }
  return {
    title,
    description,
    keywords: title.split(" "),
    openGraph: {
      images: [image],
    },
  };
}

const EpisodeDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await EpisodesSevice.GetEpisodeDetails(params.uuid);
  if (response.status === "fail") return notFound();
  const episodeDetails = response.data.episode_details;
  return (
    <EpisodeDetailsView key={episodeDetails.id} details={episodeDetails} />
  );
};

export default EpisodeDetailsPage;
