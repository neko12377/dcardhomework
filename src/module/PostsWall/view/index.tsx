import React, {useEffect, useRef, useState} from "react";
import {usePostsGetting} from "../../../hooks/usePostsGetting";

export interface PostsWallProps {};

export default (props: PostsWallProps) => {
    const posts = usePostsGetting();
    console.info(posts);
    return <div>12345</div>
}