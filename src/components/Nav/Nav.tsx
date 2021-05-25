import NavElement from "components-element/NavElement/NavElement";
import NavContainer from "container/NavContainer/NavContainer";
import styled from "styled-components";
/**
 * TODO: 상단에 검색바 / 다음에 element 요소들
 * @returns
 */

type Nav = {
  userList: JSX.Element[];
};

const Nav = ({ userList }: Nav) => {
  return <NavSection>{userList}</NavSection>;
};

export default Nav;

const NavSection = styled.div`
  width: 100%;
  max-width: 420px;
  /* background-color: #cacaca; */
  height: 100vh;
  padding: 10px;
  overflow: auto;
`;
