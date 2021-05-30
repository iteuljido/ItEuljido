import styled from "styled-components";
/**
 * TODO: 상단에 검색바 / 다음에 element 요소들
 * @returns
 */

type Props = {
  children: JSX.Element[];
  search: any;
  onChangeSearch: any;
};

const Nav = ({ children, search, onChangeSearch }: Props) => {
  return (
    <>
      <NavSection>
        <SearchInput
          type="text"
          value={search}
          onChange={onChangeSearch}
          placeholder="이름으로 검색"
        />
        {children}
      </NavSection>
    </>
  );
};

export default Nav;

const NavSection = styled.div`
  width: 100%;
  max-width: 400px;
  /* background-color: #cacaca; */
  height: 100vh;
  overflow: auto;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  background-color: #e7e7e7;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;
