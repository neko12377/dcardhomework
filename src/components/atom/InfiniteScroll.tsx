import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    PostContentInterface,
    useDataGetting,
} from "../../hooks/useDatsGetting";
import styled from "@emotion/styled";

const Base = styled.div`
    isplay: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    width: 50%;
    padding: 30px 5%;
    overflow-y: auto;
    height: 100%;
    max-height: 100%;
`;

const Block = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Title = styled.h1`
    color: #2e2e2e;
    width: 100%;
`;

const Excerpt = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #3e3e3e;

    width: 100%;
`;

const Hr = styled.hr`
    width: 100%;
    margin-bottom: 20px;
    margin-top: 30px;
    border-bottom: 1px solid #a3a0a0;
`;

const Loading = styled.div`
    position: absolute;
    display: flex;
    top: 50%;
    left: 42%;
    background-color: rgba(151, 151, 151, 0.6);
    width: 150px;
    height: 70px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

    & div {
        display: flex;
        position: relative;
        width: 80px;
        height: 70px;
    }

    & div div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: rgba(255, 255, 255, 0.73);
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }

    & div div:nth-of-type(1) {
        left: 8px;
        animation-delay: -0.24s;
    }

    & div div:nth-of-type(2) {
        left: 32px;
        animation-delay: -0.12s;
    }

    & div div:nth-of-type(3) {
        left: 56px;
        animation-delay: 0s;
    }

    @keyframes lds-facebook {
        0% {
            top: 8px;
            height: 64px;
        }
        50%,
        100% {
            top: 24px;
            height: 32px;
        }
    }
`;

interface BackToTopButtonProps {
    visibility: "flex" | "none";
}

const BackToTopButton = styled.a<BackToTopButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 26.5%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(56, 99, 158, 0.66);
  display: ${props => props.visibility};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 900;
  cursor: pointer;
`

const InfiniteScroll = () => {
    const [urlPath, setUrlPath] = useState<string>(
        "/proxy_domain_d_card/posts?popular=false"
    );
    const { posts, hasMore, isLoading } = useDataGetting(urlPath);
    const [currentLastId, setCurrentLastId] = useState<number | undefined>(
        posts[posts.length - 1]?.id
    );
    const postArray =
        posts.length > 0
            ? posts.map((item: PostContentInterface, index) => {
                  const { title, excerpt, id } = item;
                  return {
                      title,
                      excerpt,
                      id,
                  };
              })
            : [
                  {
                      title: "Currently not thing is available",
                      excerpt: "woo woo",
                  },
              ];

    const observer = useRef<null | IntersectionObserver>();
    const lastPostBlock = useCallback(
        (lastNode) => {
            observer.current && observer.current.disconnect();
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        currentLastId &&
                            setUrlPath(
                                `/proxy_domain_d_card/posts?popular=false&before=${currentLastId}`
                            );
                    }
                },
                { threshold: 0.8 }
            );
            lastNode && observer.current?.observe(lastNode);
        },
        [currentLastId]
    );

    const [backToTopButtonVisibility, setBackToTopButtonVisibility] = useState<"flex" | "none">("none");
    const topObserver = useRef<null | IntersectionObserver>();
    const firstPostBlock = useCallback(firstNode => {
        topObserver.current = new IntersectionObserver((entries) => {
            !entries[0].isIntersecting && setBackToTopButtonVisibility("flex");
            entries[0].isIntersecting && setBackToTopButtonVisibility("none");
        })
        topObserver.current?.observe(firstNode);
    }, []);

    useEffect(() => {
        hasMore && setCurrentLastId(posts[posts.length - 1]?.id);
    }, [posts, hasMore]);
    return (
        <Base>
            {isLoading && (
                <Loading>
                    <div>
                        <div />
                        <div />
                        <div />
                    </div>
                </Loading>
            )}
            <div id="top" />
            {postArray.map((item: PostContentInterface, index: number) =>
                postArray.length === index + 1 ? (
                    <Block key={`${item.title}_${item.id}`} ref={lastPostBlock}>
                        <Title>{item.title}</Title>
                        <Excerpt>{item.excerpt}</Excerpt>
                    </Block>
                ) : index === 0 ? (
                    <Block key={`${item.title}_${item.id}`} ref={firstPostBlock} id="top">
                        <Title>{item.title}</Title>
                        <Excerpt>{item.excerpt}</Excerpt>
                        <Hr />
                    </Block>
                ) : (
                    <Block key={`${item.title}_${item.id}`}>
                        <Title>{item.title}</Title>
                        <Excerpt>{item.excerpt}</Excerpt>
                        <Hr />
                    </Block>
                )
            )}
            <BackToTopButton visibility={backToTopButtonVisibility} href="#top">TOP</BackToTopButton>
        </Base>
    );
};

export default InfiniteScroll;