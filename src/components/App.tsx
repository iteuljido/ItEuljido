import MapContainer from "container/MapContainer/MapContainer";
import NavContainer from "container/NavContainer/NavContainer";
import styled from "styled-components";

const App = () => {
  return (
    <AppSection>
      <NavContainer />
      <MapContainer />
    </AppSection>
  );
};

export default App;

const AppSection = styled.section`
  width: 100%;
  display: flex;
`;
