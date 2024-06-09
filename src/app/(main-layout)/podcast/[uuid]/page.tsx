import PodcastsService from "@/services/podcasts.service";
import PodcastDetailsView from "./view";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type Props = {
  params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await PodcastsService.GetPodcastDetails(params.uuid);
  let title = "New Podcast";
  let description = "My podcast description";
  let image = "";
  if (response.status === "success") {
    title = response.data.podcast_details.podcast_name;
    description = response.data.podcast_details.podcast_desc;
    image = response.data.podcast_details.thumbnail_url;
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

const PodcastDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await PodcastsService.GetPodcastDetails(params.uuid);
  if (response.status === "fail") return notFound();
  const details = response.data.podcast_details;
  return <PodcastDetailsView details={details} key={details.id} />;
};

export default PodcastDetailsPage;
