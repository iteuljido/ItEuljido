import Nav from "components/Nav/Nav";
import useSearch from "hook/search/useSearch";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "atom/user";
import NavElemnetItem from "components-element/NavElement/NavElementItem";
import { coordsAtom } from "atom/coords";
import React, { useCallback } from "react";
import { MapSingleton } from "container/MapContainer/MapContainer";
import { navAtom, selectComapnyName } from "atom/nav";
import { darken } from "polished";

import _ from "lodash";
import styled from "styled-components";
import LabelElement from "components-element/LabelElement/LabelElement";
declare global {
  interface Window {
    kakao: any;
  }
}

interface INavElementSection {
  isSelectedItem: boolean;
}
const NavContainer = () => {
  const { filterItem, search, onChangeSearch } = useSearch();
  const company = useRecoilValue(userAtom);
  const uniqueCompany = _.uniqBy(company, "companyName");
  const selectEelement = useSetRecoilState(coordsAtom);
  const filterUserList = filterItem(company, "companyName");

  const isNavItemSelected = useRecoilValue(navAtom);
  const selectedNavCompanyName = useRecoilValue(selectComapnyName);
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
        {uniqueCompany.map((data: any, index: number) => (
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
          <div onClick={() => setNavDeps(false)}>닫기</div>
          {company
            .filter((args) => args.companyName === selectedNavCompanyName)
            .map((data) => {
              const {
                name,
                type,
                generation,
                profileImg,
                tagImg,
                explanation,
                companyName,
              } = data;
              return (
                <UserWrapper>
                  <UserImg src={profileImg} />
                  <UserInfoSection>
                    <UserInfoWrapper>
                      <UserNameWrapper>
                        <UserName>{name}</UserName>
                        {tagImg === "" ? null : (
                          <div>
                            <TagImg src={tagImg} alt="" />
                          </div>
                        )}
                      </UserNameWrapper>
                      <LabelElement title={type} />
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

const UserCompanyName = styled.div`
  font-size: 12px;
  overflow: hidden;
  height: 100%;
  /* width: 100%; */
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagImg = styled.img`
  width: 40px;
  /* display: block; */
  vertical-align: bottom;
`;

const NameWrapper = styled.div`
  display: flex;
`;

const UserDescription = styled.div`
  font-size: 12px;
`;
