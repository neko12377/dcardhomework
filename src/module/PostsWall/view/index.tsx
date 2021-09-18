import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {InfiniteScroll} from "../../../components/atom/InfiniteScroll";


export interface PostsWallProps {
}

const PostsWall = (props: PostsWallProps) => {
    return <InfiniteScroll />
};

export default PostsWall;
