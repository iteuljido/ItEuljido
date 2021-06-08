import styled from "styled-components";

const Map = () => {
  return (
    <MapWrapper>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </MapWrapper>
  );
};

export default Map;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 500px) {
    height: 60vh;
  }
`;
