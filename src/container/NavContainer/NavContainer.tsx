import NavElement from "components-element/NavElement/NavElement";
import Nav from "components/Nav/Nav";
import DB from "data/db.json";
import { useEffect } from "react";
import { DBType } from "type/DBType/DBType";
/*global kakao*/

declare global {
  interface Window {
    kakao: any;
  }
}

const NavContainer = () => {
  const userList = DB.map((data, index) => {
    const {
      name,
      explanation,
      companyName,
      companyLocation,
      profileImg,
      type,
    } = data;
    return (
      <NavElement
        key={index}
        name={name}
        explanation={explanation}
        companyName={companyName}
        companyLocation={companyLocation}
        profileImg={profileImg}
        type={type}
      />
    );
  });
  return <Nav userList={userList} />;
};

export default NavContainer;
