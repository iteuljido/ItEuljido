import Map from "components/Map/Map";
import { useEffect } from "react";

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

    // const marker = new window.kakao.maps.Marker({});

    // marker.setMap(MapSingleton.getInstance().map);
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
