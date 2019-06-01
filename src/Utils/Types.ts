import { string } from "prop-types";

/** Post object from https://jsonplaceholder.typicode.com/ */
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/** Comment of a Post */
export interface PostComment {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
