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
