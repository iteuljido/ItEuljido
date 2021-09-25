import useCoords from 'hook/coords/coords';
import { memo } from 'react';
import { DBType } from 'type/DBType/DBType';
import NavElement from './NavElement';

type Props = {
  data: DBType;
  index: number;
  userSelector: (coords: string) => void;
};

const NavElemnetItem = memo(({ data, index, userSelector }: Props) => {
  const {
    name,
    explanation,
    companyName,
    companyLocation,
    profileImg,
    type,
    tagImg,
  } = data;
  const tagImgExist = tagImg !== '' ? tagImg : null;
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
      tagImg={tagImgExist || ''}
    />
  );
});

export default NavElemnetItem;
