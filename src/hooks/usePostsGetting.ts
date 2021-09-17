// GET https://www.dcard.tw/v2/posts?popular=true

import { useEffect, useState } from "react";

export const usePostsGetting = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("/proxy_domain/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.info(`%c${err}`, "color: red");
      });
  }, []);

  return posts;
};
