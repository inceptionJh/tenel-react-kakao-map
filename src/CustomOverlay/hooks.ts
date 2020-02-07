import { IKakao, IKakaoMap, IKakaoCustomOverlay } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (customOverlay: IKakaoCustomOverlay, map: IKakaoMap) => {
  React.useEffect(() => {
    customOverlay.setMap(map);
    return () => customOverlay.setMap(null);
  }, []);
};

const usePosition = (customOverlay: IKakaoCustomOverlay, position: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    customOverlay.setPosition(latlng);
  }, [position]);
};

const useContent = (customOverlay: IKakaoCustomOverlay, content: HTMLElement | string) => {
  React.useEffect(() => {
    customOverlay.setContent(content);
  }, [content]);
};

const useRange = (customOverlay: IKakaoCustomOverlay, range: number) => {
  React.useEffect(() => {
    customOverlay.setRange(range);
  }, [range]);
};

const useAltitude = (customOverlay: IKakaoCustomOverlay, altitude: number) => {
  React.useEffect(() => {
    customOverlay.setAltitude(altitude);
  }, [altitude]);
};

const useZIndex = (customOverlay: IKakaoCustomOverlay, zIndex: number) => {
  React.useEffect(() => {
    customOverlay.setZIndex(zIndex);
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
