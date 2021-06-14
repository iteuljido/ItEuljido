import { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element[];
  search: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Nav = ({ children, search, onChangeSearch }: Props) => {
  return (
    <>
      <NavSection>
        <SearchWrapper>
          <SearchInput
            type="text"
            value={search}
            onChange={onChangeSearch}
            placeholder="회사 이름으로 검색"
          />
        </SearchWrapper>
        <ClickLink>
          <a
            href="https://github.com/SoonGwan/daesogoMap/blob/master/README.md"
            target="_blank"
            rel="noreferrer"
          >
            지금 나를 등록하세요!
          </a>
        </ClickLink>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </NavSection>
    </>
  );
};

export default Nav;

const ChildrenWrapper = styled.div`
  @media screen and (max-width: 500px) {
    height: calc(40vh - 79px);
    overflow-y: auto;
  }
`;

const NavSection = styled.div`
  box-sizing: border-box;
  min-width: 300px;
  max-width: 300px;
  z-index: 9999;
  height: 100vh;
  overflow: auto;

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 10px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
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

const ClickLink = styled.div`
  font-size: 13px;
  color: gray;
  padding: 0px 0px 10px 10px;

  & > a {
    color: #0068c3;
  }
`;
