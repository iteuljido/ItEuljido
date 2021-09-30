import { useEffect, useState } from 'react';

const useCoords = (location: string) => {
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();

  const [geocoderObj, setGeocoderObj] = useState<any>();

  useEffect(() => {
    if (location === '' || location === undefined || location === null) {
      throw new Error('locatio에 해당하는 값이 없습니다.');
    }
    geocoder.addressSearch(location, (result: any) => {
      setGeocoderObj(new kakao.maps.LatLng(result[0].y, result[0].x));
      // ma 위도 la 경도
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return geocoderObj;
};

export default useCoords;
