import useCoords from "lib/coords/coords";
import React, { memo } from "react";
import NavElement from "./NavElement";

const NavElemnetItem: React.FC<any> = memo(
  ({ data, index, userSelector }: any) => {
    const {
      name,
      explanation,
      companyName,
      companyLocation,
      profileImg,
      type,
    } = data;

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
      />
    );
  }
);

export default NavElemnetItem;
