import Nav from "components/Nav/Nav";
import useSearch from "hook/search/useSearch";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "atom/user";
import NavElemnetItem from "components-element/NavElement/NavElementItem";
import { coordsAtom } from "atom/coords";
import { useCallback } from "react";
import { MapSingleton } from "container/MapContainer/MapContainer";
import { navAtom, selectComapnyName } from "atom/nav";
import { IoMdClose } from "react-icons/io";
import _ from "lodash";
import styled from "styled-components";
import LabelElement from "components-element/LabelElement/LabelElement";

declare global {
  interface Window {
    kakao: any;
  }
}

const NavContainer = () => {
  const { filterItem, search, onChangeSearch } = useSearch();
  const company = useRecoilValue(userAtom);
  const uniqueCompany = _.uniqBy(company, "companyName");
  const selectEelement = useSetRecoilState(coordsAtom);
  const filterUserList = filterItem(uniqueCompany, "companyName");

  const isNavItemSelected = useRecoilValue(navAtom);
  const [selectedNavCompanyName, setSelectedNavCompanyName] =
    useRecoilState(selectComapnyName);
  const setCoords = useSetRecoilState(coordsAtom);
  const setNavDeps = useSetRecoilState(navAtom);

  const userSelector = useCallback(
    (coords) => {
      MapSingleton.getInstance().map.setCenter(coords);
      MapSingleton.getInstance().map.setLevel(3);

      selectEelement(coords);
    },
    [selectEelement]
  );

  return (
    <>
      <Nav search={search} onChangeSearch={onChangeSearch}>
        {filterUserList.map((data: any, index: number) => (
          <NavElemnetItem
            key={index}
            data={data}
            index={index}
            userSelector={userSelector}
          />
        ))}
      </Nav>
      {isNavItemSelected && (
        <SelectedItem>
          <CloseNavWrapper>
            <IoMdClose
              onClick={() => {
                setNavDeps(false);
                setSelectedNavCompanyName("");
                setCoords("");
              }}
            />
          </CloseNavWrapper>
          {company
            .filter((args) => args.companyName === selectedNavCompanyName)
            .map((data, index) => {
              const {
                name,
                position,
                generation,
                profileImg,
                tagImg,
                explanation,
                // companyName,
              } = data;
              return (
                <UserWrapper key={index}>
                  <UserImg src={profileImg} />
                  <UserInfoSection>
                    <UserInfoWrapper>
                      <UserNameWrapper>
                        <Generation>{generation}기</Generation>
                        <UserName>{name}</UserName>
                        {tagImg === "" ? null : (
                          <div>
                            <TagImg src={tagImg} alt="" />
                          </div>
                        )}
                      </UserNameWrapper>
                      <LabelElement title={position} />
                    </UserInfoWrapper>
                    <UserDescription>{explanation}</UserDescription>
                  </UserInfoSection>
                </UserWrapper>
              );
            })}
        </SelectedItem>
      )}
    </>
  );
};

export default NavContainer;

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseNavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 40px;

  & > * {
    transition: all 0.25s ease;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      color: rgb(254, 79, 82);
    }
  }
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: baseline;

  & > * + * {
    margin-left: 4px;
  }
`;

const SelectedItem = styled.div`
  position: absolute;
  left: 300px;
  width: 100%;
  height: 100vh;
  max-width: 320px;
  background-color: white;
  z-index: 100;
  box-shadow: 16px 0px 20px rgba(0, 0, 0, 10%);
  padding: 10px;
  overflow: auto;

  @media screen and (max-width: 500px) {
    max-width: 100%;
    left: 0px;
    bottom: 0px;
    height: 300px;
    z-index: 9999;
  }
`;

const UserInfoSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  margin-right: 20px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TagImg = styled.img`
  width: 40px;
  vertical-align: bottom;
`;

const UserDescription = styled.div`
  font-size: 12px;
`;

const Generation = styled.div`
  font-size: 14px;
  color: #cccbcb;
`;
