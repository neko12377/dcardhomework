// GET https://www.dcard.tw/v2/posts?popular=true

import { useEffect, useRef, useState } from "react";

export interface PostContentInterface {
    title: string;
    excerpt: string;
    id?: number;
}

interface usePostsGettingReturnInterface {
    posts: PostContentInterface[];
    hasMore: boolean;
    error: boolean;
    isLoading: boolean;
}

export const useDataGetting = (
    urlPath: string
): usePostsGettingReturnInterface => {
    const [posts, setPosts] = useState<PostContentInterface[]>([]);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        urlPath &&
            fetch(urlPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                mode: "cors",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    data &&
                        setPosts((preData) => {
                            return [...new Set([...preData, ...data])];
                        });
                    setIsLoading(false);
                    setHasMore(data.length > 0);
                })
                .catch((err) => {
                    console.info(`%c${err}`, "color: red");
                    setError(true);
                });
    }, [urlPath]);

    return { posts, hasMore, error, isLoading };
};
