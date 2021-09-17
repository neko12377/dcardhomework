import React from "react";
import { usePostsGetting } from "hooks/usePostsGetting";

export interface PostsWallProps {}

const PostsWall = (props: PostsWallProps) => {
  const posts = usePostsGetting();
  return <div>12345</div>;
};

export default PostsWall;
