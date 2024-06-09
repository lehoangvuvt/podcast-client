import { notFound } from "next/navigation";
import GenreDetailsView from "./view";
import GenresService from "@/services/genres.service";

const GenreDetailsPage = async ({ params }: { params: { uuid: string } }) => {
  const response = await GenresService.GetGenreDetails(params.uuid);
  if (response.status === "fail") return notFound();
  const details = response.data.genre_details;
  return <GenreDetailsView details={details} key={details.id} />;
};

export default GenreDetailsPage;
