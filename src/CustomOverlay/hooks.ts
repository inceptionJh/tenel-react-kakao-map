import { IKakao, IKakaoMap, IKakaoCustomOverlay } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (circle: IKakaoCustomOverlay, map: IKakaoMap) => {
  React.useEffect(() => {
    circle.setMap(map);
    return () => circle.setMap(null);
  }, []);
};

const usePosition = (ellipse: IKakaoCustomOverlay, position: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    ellipse.setPosition(latlng);
  }, [position]);
};

const useContent = (ellipse: IKakaoCustomOverlay, content: HTMLElement | string) => {
  React.useEffect(() => {
    ellipse.setContent(content);
  }, [content]);
};

const useRange = (marker: IKakaoCustomOverlay, range: number) => {
  React.useEffect(() => {
    marker.setRange(range);
  }, [range]);
};

const useAltitude = (marker: IKakaoCustomOverlay, altitude: number) => {
  React.useEffect(() => {
    marker.setAltitude(altitude);
  }, [altitude]);
};

const useZIndex = (ellipse: IKakaoCustomOverlay, zIndex: number) => {
  React.useEffect(() => {
    ellipse.setZIndex(zIndex);
  }, [zIndex]);
};

export default {
  useInit,
  usePosition,
  useContent,
  useRange,
  useAltitude,
  useZIndex,
};
