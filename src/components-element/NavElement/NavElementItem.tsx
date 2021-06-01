import useCoords from "hook/coords/coords";
import React, { memo } from "react";
import NavElement from "./NavElement";

const NavElemnetItem = ({ data, index, userSelector }: any) => {
  const {
    name,
    explanation,
    companyName,
    companyLocation,
    profileImg,
    type,
    tagImg,
  } = data;
  const tagImgExist = tagImg !== "" ? tagImg : null;
  const coords = useCoords(companyLocation);

  return (
    <NavElement
      key={index}
      userSelector={userSelector}
      coords={coords}
      name={name}
      explanation={explanation}
      companyName={companyName}
      companyLocation={companyLocation}
      profileImg={profileImg}
      type={type}
      tagImg={tagImgExist}
    />
  );
};

export default NavElemnetItem;
