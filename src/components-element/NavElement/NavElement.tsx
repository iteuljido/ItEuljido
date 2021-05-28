import { coordsAtom } from "atom/coords";
import LabelElement from "components-element/LabelElement/LabelElement";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { darken } from "polished";
interface INavElementSection {
  isSelectedItem: boolean;
}

const NavElement = ({
  name,
  explanation,
  companyName,
  companyLocation,
  profileImg,
  type,
  coords,
  userSelector,
}: any) => {
  const selectElement = useRecoilValue(coordsAtom);
  const isSelectedItem = coords === selectElement ? true : false;

  return (
    <NavElementSection
      onClick={() => userSelector(coords)}
      isSelectedItem={isSelectedItem}
    >
      <UserWrapper>
        <UserImg src={profileImg} />
        <UserInfoSection>
          <UserInfoWrapper>
            <UserNameWrapper>
              <UserName>{name}</UserName>
              <UserCompanyName>@{companyName}</UserCompanyName>
            </UserNameWrapper>
            <LabelElement title={type} />
          </UserInfoWrapper>
          <UserDescription>{explanation}</UserDescription>
        </UserInfoSection>
      </UserWrapper>
    </NavElementSection>
  );
};

export default NavElement;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: baseline;
  & > * + * {
    margin-left: 4px;
  }
`;

const NavElementSection = styled.section<INavElementSection>`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(245, 245, 245);
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) =>
    props.isSelectedItem ? `${darken(0.05, "#fff")}` : "#fff"};

  &:hover {
    background-color: ${(props) =>
      props.isSelectedItem
        ? `${darken(0.05, "#fff")}`
        : `${darken(0.02, "#fff")}`};
  }
`;

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
`;

const NameWrapper = styled.div`
  display: flex;
`;

const UserDescription = styled.div`
  font-size: 12px;
`;
