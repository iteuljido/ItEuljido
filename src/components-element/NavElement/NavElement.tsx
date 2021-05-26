import LabelElement from "components-element/LabelElement/LabelElement";
import styled from "styled-components";
import { DBType } from "type/DBType/DBType";

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
  return (
    <NavElementSection onClick={() => userSelector(coords)}>
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

const NavElementSection = styled.section`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(245, 245, 245);
  cursor: pointer;
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
