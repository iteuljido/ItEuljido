import Map from "components/Map/Map";
import { useEffect, useState, useCallback } from "react";
import DB from "data/db.json";

const MapContainer = () => {
  const kakaoMapHandler = useCallback(() => {
    const { kakao } = window;
    let lat = 36;
    let long = 127;

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 10,
    };

    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    for (let i = 0; i < DB.length; i += 1) {
      console.log(DB[i].companyLocation);
      geocoder.addressSearch(DB[i].companyLocation, (result: any) => {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${DB[i].name}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        // map.setCenter(coords);
      });
    }
  }, []);

  useEffect(() => {
    kakaoMapHandler();
  }, []);
  return <Map />;
};

export default MapContainer;
