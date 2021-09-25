import Map from 'components/Map/Map';
import { useEffect } from 'react';
import DB from 'data/db.json';
import _ from 'lodash';
import util from 'util';
import './MapInfoElement.scss';

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

    const container = document.getElementById('map');
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
      'companyName'
    );

    let markerTemp = [] as any;
    const fetchAddress = (location: string, callback: any) => {
      geocoder.addressSearch(location, (result: any) => {
        callback(null, result);
      });
    };
    for (const keyName in groupByDuplicatedComapny) {
      let temp = [] as string[];

      const promises = groupByDuplicatedComapny[keyName].map((data, index) => {
        temp.push(data.name);
        const search = util.promisify(fetchAddress);
        return search(data.companyLocation);
      });

      const search = (await Promise.all(promises)) as any;
      groupByDuplicatedComapny[keyName].forEach(() => {
        const coords = new kakao.maps.LatLng(search[0][0].y, search[0][0].x);
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
        });
        markerTemp.push(marker);

        const content = `
        <div class="contentWrapper">
        <div class="companyIconWrapper">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="64" height="64"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#0068c3"><path d="M159.90625,1.34375h-94.0625c-2.28438,0 -4.03125,1.74687 -4.03125,4.03125v33.325l-49.85312,19.35c-1.47813,0.5375 -2.55312,2.15 -2.55312,3.7625v104.8125c0,2.28438 1.74688,4.03125 4.03125,4.03125h14.78125c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-24.1875c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28438,0 4.03125,1.74687 4.03125,4.03125v24.1875c0,2.28438 1.74687,4.03125 4.03125,4.03125h5.375c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-98.76562c0,-1.6125 0.94063,-3.225 2.41875,-3.89688c2.6875,-1.20937 5.64375,0.80625 5.64375,3.62813v102.79688v0.13437h30.90625c2.28437,0 4.03125,-1.74687 4.03125,-4.03125v-24.1875c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28437,0 4.03125,1.74688 4.03125,4.03125v24.1875c0,2.28438 1.74688,4.03125 4.03125,4.03125h34.9375c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-161.11562c0,-2.28438 -1.74687,-4.03125 -4.03125,-4.03125zM44.34375,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM44.34375,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,61.8125c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM94.0625,34.9375c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM116.90625,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM116.90625,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM116.90625,61.8125c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM116.90625,34.9375c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM139.75,115.5625c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74688 4.03125,4.03125zM139.75,88.6875c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74688 4.03125,4.03125zM139.75,61.8125c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74687 4.03125,4.03125zM139.75,34.9375c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74687 4.03125,4.03125z"></path></g></g></svg>
        </div>
          <div>${groupByDuplicatedComapny[keyName][0].companyName}</div>
          <div class="tail"></div>
        </div>`;

        const overlay = new kakao.maps.CustomOverlay({
          content,
          map: this.map,
          position: marker.getPosition(),
          yAnchor: 2.1,
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          overlay.setMap(this.map);
        });

        // kakao.maps.event.addListener(this.map, 'click', () => {
        //   overlay.setMap(null);
        // });

        kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
          let level = this.map.getLevel();
          if (level < 5) {
            overlay.setMap(this.map);
          } else {
            overlay.setMap(null);
          }
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
            <div class="companyIconWrapper">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="64" height="64"
              viewBox="0 0 172 172"
              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#0068c3"><path d="M159.90625,1.34375h-94.0625c-2.28438,0 -4.03125,1.74687 -4.03125,4.03125v33.325l-49.85312,19.35c-1.47813,0.5375 -2.55312,2.15 -2.55312,3.7625v104.8125c0,2.28438 1.74688,4.03125 4.03125,4.03125h14.78125c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-24.1875c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28438,0 4.03125,1.74687 4.03125,4.03125v24.1875c0,2.28438 1.74687,4.03125 4.03125,4.03125h5.375c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-98.76562c0,-1.6125 0.94063,-3.225 2.41875,-3.89688c2.6875,-1.20937 5.64375,0.80625 5.64375,3.62813v102.79688v0.13437h30.90625c2.28437,0 4.03125,-1.74687 4.03125,-4.03125v-24.1875c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28437,0 4.03125,1.74688 4.03125,4.03125v24.1875c0,2.28438 1.74688,4.03125 4.03125,4.03125h34.9375c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-161.11562c0,-2.28438 -1.74687,-4.03125 -4.03125,-4.03125zM44.34375,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM44.34375,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM94.0625,61.8125c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM94.0625,34.9375c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM116.90625,115.5625c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM116.90625,88.6875c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74688 4.03125,4.03125zM116.90625,61.8125c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM116.90625,34.9375c0,2.28437 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125c2.28437,0 4.03125,1.74687 4.03125,4.03125zM139.75,115.5625c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74688 4.03125,4.03125zM139.75,88.6875c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28437 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74688 4.03125,4.03125zM139.75,61.8125c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74687 4.03125,4.03125zM139.75,34.9375c0,2.28437 -1.74687,4.03125 -4.03125,4.03125c-2.28438,0 -4.03125,-1.74688 -4.03125,-4.03125v-5.375c0,-2.28438 1.74687,-4.03125 4.03125,-4.03125c2.28438,0 4.03125,1.74687 4.03125,4.03125z"></path></g></g></svg>
              </div>
              <div>${oneCompany[idx].companyName}</div>
              <div class="tail"></div>
              </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content,
        map: this.map,
        position: marker.getPosition(),
        yAnchor: 2.1,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        overlay.setMap(this.map);
      });

      // kakao.maps.event.addListener(marker, 'click', () => {
      //   overlay.setMap(null);
      // });

      kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
        let level = this.map.getLevel();
        if (level < 6) {
          overlay.setMap(this.map);
        } else {
          overlay.setMap(null);
        }
      });

      overlay.setMap(null);
    }

    const clusterer = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      minLevel: 5,
      disableClickZoom: true,
      calculator: [1, 3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    });

    kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: any) => {
      level = this.map.getLevel() - 3;

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
