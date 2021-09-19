/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import InfiniteScroll from "./InfiniteScroll";
import {createSerializer} from "@emotion/jest";

const intersectionObserverMock = () => ({
    observe: () => null,
    disconnect: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

expect.addSnapshotSerializer(createSerializer());

test("scroll", () => {
    const component = renderer.create(<InfiniteScroll />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
})