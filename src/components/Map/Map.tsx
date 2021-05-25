/*global kakao*/

import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Map;
