// Interfaz para un post de Reddit
export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
  thumbnail?: string;
  subreddit: string;
}

// Interfaz para la respuesta de la API de Reddit
export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}
