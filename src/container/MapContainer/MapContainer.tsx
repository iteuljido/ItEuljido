import Map from "components/Map/Map";
import { useEffect } from "react";
import DB from "data/db.json";
import _, { groupBy } from "lodash";
import util from "util";
import "./MapInfoElement.scss";
import MarkerImg from "assets/marker/map-marker-300.png";

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
        const coords = new kakao.maps.LatLng(search[0][0].y, search[0][0].x);
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
        });
        markerTemp.push(marker);

        const content = `
        <div class="contentWrapper">
          <div>Working in ${
            groupByDuplicatedComapny[keyName][0].companyName
          }</div>
            ${temp
              .map((data: any, index: number) => {
                return `
                <div class="contentItem">
                  <img class="profile" src=${groupByDuplicatedComapny[keyName][index].profileImg} alt="" />
                    <div>(${groupByDuplicatedComapny[keyName][index].generation}기) ${data}</div> 
                    <div>${groupByDuplicatedComapny[keyName][index].type}</div>
                  </div>`;
              })
              .join("")}
                  </div>
                </div>`;

        const overlay = new kakao.maps.CustomOverlay({
          content,
          map: this.map,
          position: marker.getPosition(),
          xAnchor: -0.2,
          yAnchor: 0.6,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          overlay.setMap(this.map);
        });

        kakao.maps.event.addListener(marker, "mouseover", () => {
          overlay.setMap(this.map);
        });

        // kakao.maps.event.addListener(marker, "mouseout", () => {
        //   overlay.setMap(null);
        // });

        kakao.maps.event.addListener(this.map, "click", () => {
          overlay.setMap(null);
        });

        overlay.setMap(null);
      });
    }

    const oneCompany = DB.filter((word) => !duplicatedCompany.includes(word));
    for (const idx in oneCompany) {
      const promises = [oneCompany[idx]].map((data) => {
        const search = util.promisify(fetchAddress);
        return search(data.companyLocation);
      });

      const search = (await Promise.all(promises)) as any;
      const coords = new kakao.maps.LatLng(search[0][0].y, search[0][0].x);
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
      });
      markerTemp.push(marker);
      const content = `
            <div class="contentWrapper">
              <div>Working in ${oneCompany[idx].companyName}</div>
                <div class="contentItem">
                  <img class="profile" src=${oneCompany[idx].profileImg} alt="" />
                    <div>(${oneCompany[idx].generation}기) ${oneCompany[idx].name}</div> 
                    
                  </div>
                </div>
              </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content,
        map: this.map,
        position: marker.getPosition(),
        xAnchor: -0.2,
        yAnchor: 0.6,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        overlay.setMap(this.map);
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        overlay.setMap(this.map);
      });

      // kakao.maps.event.addListener(marker, "mouseout", () => {
      //   overlay.setMap(null);
      // });

      kakao.maps.event.addListener(this.map, "click", () => {
        overlay.setMap(null);
      });

      overlay.setMap(null);

      // const infowindow = new kakao.maps.InfoWindow({
      //   content: `<div>${oneCompany[idx].name}</div>`,
      // });
      // infowindow.open(this.map, marker);
    }

    const clusterer = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      minLevel: 5,
      disableClickZoom: true,
      calculator: [1, 3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    });

    kakao.maps.event.addListener(clusterer, "clusterclick", (cluster: any) => {
      level = this.map.getLevel() - 2;

      this.map.setLevel(level, { anchor: cluster.getCenter() });
    });
    clusterer.addMarkers(markerTemp);
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
