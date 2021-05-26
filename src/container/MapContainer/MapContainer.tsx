import Map from "components/Map/Map";
import { useEffect } from "react";
import DB from "data/db.json";

const { kakao } = window;

class MapSingleton {
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

    const geocoder = new kakao.maps.services.Geocoder();
    for (let i = 0; i < DB.length; i += 1) {
      console.log(DB[i].companyLocation);
      geocoder.addressSearch(DB[i].companyLocation, (result: any) => {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${DB[i].name}</div>`,
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
