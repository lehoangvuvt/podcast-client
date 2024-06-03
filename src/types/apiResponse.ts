export type UserInfo = {
  id: number;
  username: number;
  email: number;
};

export type Genre = {
  id: number;
  uuid: string;
  genre_name: string;
  genre_desc: string;
  bg_image: string;
};

export type GenreDetails = {
  podcasts: Podcast[];
} & Genre;

export type Podcast = {
  id: number;
  uuid: string;
  owner_id: string;
  podcast_name: string;
  podcast_desc: string;
  thumbnail_url: string;
  created_at: string;
};

export type PodcastDetails = {
  id: number;
  uuid: string;
  owner_id: string;
  podcast_name: string;
  podcast_desc: string;
  thumbnail_url: string;
  episodes: PodcastEpisode[];
  created_at: string;
};

export type PodcastEpisode = {
  id: number;
  uuid: string;
  podcast_id: number;
  episode_name: string;
  episode_no: number;
  episode_desc: string;
  source_url: string;
  created_at: string;
};

export type LoginSuccessResponse = UserInfo;

export type GetAllGenresSuccessResponse = {
  genres: Genre[];
};

export type GetAllPodcastsSuccessResponse = {
  podcasts: Podcast[];
};

export type GetPodcastDetailsSuccessResponse = {
  podcast_details: PodcastDetails;
};

export type GetGenreDetailsSuccessResponse = {
  genre_details: GenreDetails;
};
