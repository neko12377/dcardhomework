import React, {useCallback, useEffect, useRef, useState} from "react";
import {PostContentInterface, useDataGetting} from "../../hooks/useDatsGetting";
import styled from "@emotion/styled";

const Base = styled.div`
  isplay: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: #2e2e2e;
`;

const Excerpt = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #3e3e3e
`;

export const InfiniteScroll = () => {
    const [urlPath, setUrlPath] = useState<string>("/proxy_domain_d_card/posts?popular=false");
    const {posts, hasMore} = useDataGetting(urlPath);
    const [currentLastId, setCurrentLastId] = useState<number | undefined>(posts[posts.length - 1]?.id);
    const postArray = posts.length > 0 ? posts.map((item: PostContentInterface, index) => {
        const {title, excerpt, id} = item;
        return {
            title,
            excerpt,
            id
        };
    }) : [{title: "Currently not thing is available", excerpt: "woo woo"}];

    const observer = useRef<null | IntersectionObserver>();
    const lastPostBlock = useCallback(lastNode => {
        observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                currentLastId && setUrlPath(`/proxy_domain_d_card/posts?popular=false&before=${currentLastId}`);
            }

        }, {threshold: 0.8})
        lastNode && observer.current?.observe(lastNode);
    }, [currentLastId, urlPath]);

    useEffect(() => {
        hasMore && setCurrentLastId(posts[posts.length - 1]?.id);
    }, [posts, hasMore]);

    return (
        <Base>
            {
                postArray.map((item: PostContentInterface, index: number) => (
                    postArray.length === index + 1 ? (
                        <Block key={`${item.title}_${item.id}`} ref={lastPostBlock}>
                            <Title>{item.title}</Title>
                            <Excerpt>{item.excerpt}</Excerpt>
                        </Block>
                    ) : (
                        <Block key={`${item.title}_${item.id}`}>
                            <Title>{item.title}</Title>
                            <Excerpt>{item.excerpt}</Excerpt>
                        </Block>
                    )
                ))
            }
        </Base>
    )
}