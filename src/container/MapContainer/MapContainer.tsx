import Map from "components/Map/Map";
import { useEffect } from "react";
import DB from "data/db.json";
import { useRecoilValue } from "recoil";
import { coordsAtom } from "atom/coords";
import _, { groupBy } from "lodash";
import { createImportSpecifier } from "typescript";

const { kakao } = window;

export class MapSingleton {
  private static instance: MapSingleton;

  private constructor() {
    /** */
  }

  public map: any;
  public isLoaded = false;

  public initMap() {
    if (this.isLoaded) {
      return;
    }

    let lat = 36;
    let long = 127;

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(lat, long),
      level: 12,
    };

    this.map = new window.kakao.maps.Map(container, options);

    const duplicatedCompany = _.filter(
      DB,
      (v) => _.filter(DB, (v1) => v1.companyName === v.companyName).length > 1
    );
    const geocoder = new kakao.maps.services.Geocoder();

    const groupByDuplicatedComapny = _.groupBy(
      duplicatedCompany,
      "companyName"
    );

    for (const keyName in groupByDuplicatedComapny) {
      let temp = [] as any;

      groupByDuplicatedComapny[keyName].map((data, index) => {
        temp.push(data.name);
        geocoder.addressSearch(data.companyLocation, (result: any) => {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div>${temp.map((data: any) => {
              return data;
            })}</div>`,
          });
          infowindow.open(this.map, marker);
        });
      });
    }
    const oneCompany = DB.filter((word) => !duplicatedCompany.includes(word));
    for (let i = 0; i < oneCompany.length; i += 1) {
      geocoder.addressSearch(oneCompany[i].companyLocation, (result: any) => {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${oneCompany[i].name}</div>`,
        });
        infowindow.open(this.map, marker);
      });
    }

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    MapSingleton.getInstance().map.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    const zoomControl = new window.kakao.maps.ZoomControl();
    MapSingleton.getInstance().map.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.RIGHT
    );

    this.isLoaded = true;
  }
  static getInstance() {
    if (MapSingleton.instance === undefined) {
      MapSingleton.instance = new MapSingleton();
    }

    return MapSingleton.instance;
  }
}

const MapContainer = () => {
  useEffect(() => {
    MapSingleton.getInstance().initMap();
  }, []);

  useEffect(() => {
    return () => {
      MapSingleton.getInstance().isLoaded = false;
    };
  }, []);

  return <Map />;
};

export default MapContainer;
