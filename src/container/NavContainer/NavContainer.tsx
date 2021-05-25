import NavElement from "components-element/NavElement/NavElement";
import Nav from "components/Nav/Nav";
import DB from "data/db.json";
import { DBType } from "type/DBType/DBType";

const NavContainer = () => {
  const userList = DB.map((data) => {
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
