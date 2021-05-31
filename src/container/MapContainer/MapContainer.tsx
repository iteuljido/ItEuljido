import Map from "components/Map/Map";
import { useEffect } from "react";
import DB from "data/db.json";
import _, { groupBy } from "lodash";
import util from "util";

const { kakao } = window;

export class MapSingleton {
  private static instance: MapSingleton;

  private constructor() {
    /** */
  }

  public map: any;
  public isLoaded = false;

  public async initMap() {
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

    let level = this.map.getLevel();

    const duplicatedCompany = _.filter(
      DB,
      (v) => _.filter(DB, (v1) => v1.companyName === v.companyName).length > 1
    );
    const geocoder = new kakao.maps.services.Geocoder();

    const groupByDuplicatedComapny = _.groupBy(
      duplicatedCompany,
      "companyName"
    );

    let markerTemp: any = [];
    const fetchAddress = (location: string, callback: any) => {
      geocoder.addressSearch(location, (result: any) => {
        callback(null, result);
      });
    };

    for (const keyName in groupByDuplicatedComapny) {
      let temp = [] as any;

      const promises = groupByDuplicatedComapny[keyName].map((data, index) => {
        temp.push(data.name);
        const search = util.promisify(fetchAddress);
        return search(data.companyLocation);
      });

      const search = (await Promise.all(promises)) as any;

      groupByDuplicatedComapny[keyName].forEach((data, index) => {
        console.log(data);
        console.log(search[0][0]);
        const coords = new kakao.maps.LatLng(search[0][0].y, search[0][0].x);
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
        });
        // console.log("marker", marker);
        markerTemp.push(marker);

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div>${temp.map((data: any) => {
            return data;
          })}</div>`,
        });

        infowindow.open(this.map, marker);
      });
    }

    const oneCompany = DB.filter((word) => !duplicatedCompany.includes(word));
    for (const idx in oneCompany) {
      const promises = [oneCompany[idx]].map((data) => {
        const search = util.promisify(fetchAddress);
        return search(data.companyLocation);
      });

      const search = (await Promise.all(promises)) as any;
      console.log(search[0][0]);
      const coords = new kakao.maps.LatLng(search[0][0].y, search[0][0].x);
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
      });
      markerTemp.push(marker);

      // const infowindow = new kakao.maps.InfoWindow({
      //   content: `<div>${data.name}</div>`,
      // });
      // infowindow.open(this.map, marker);
    }

    const clusterer = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      minLevel: 5,
      disableClickZoom: true,
      calculator: [20, 50, 100],
      styles: [
        {
          width: "50px",
          height: "50px",
          "background-color": "red",
        },
        { width: "60px", height: "60px" },
        { width: "94px", height: "94px" },
      ],
    });

    kakao.maps.event.addListener(clusterer, "clusterclick", (cluster: any) => {
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      level = this.map.getLevel() - 1;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      this.map.setLevel(level, { anchor: cluster.getCenter() });
    });
    //
    clusterer.addMarkers(markerTemp);
    console.log("markerTemp", markerTemp.length);
    //
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
