import { IKakaoMarker, IKakao, IKakaoMouseEvent, IKakaoMap, IKakaoMarkerImage } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (marker: IKakaoMarker, map: IKakaoMap) => {
  React.useEffect(() => {
    marker.setMap(map);
    return () => marker.setMap(null);
  }, []);
};

const usePosition = (marker: IKakaoMarker, position: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    marker.setPosition(latlng);
  }, [position]);
};

const useClickable = (marker: IKakaoMarker, clickable: boolean) => {
  React.useEffect(() => {
    marker.setClickable(clickable);
  }, [clickable]);
};

const useDraggable = (marker: IKakaoMarker, draggable: boolean) => {
  React.useEffect(() => {
    marker.setDraggable(draggable);
  }, [draggable]);
};

const useVisible = (marker: IKakaoMarker, visible: boolean) => {
  React.useEffect(() => {
    marker.setVisible(visible);
  }, [visible]);
};

const useTitle = (marker: IKakaoMarker, title: string) => {
  React.useEffect(() => {
    marker.setTitle(title);
  }, [title]);
};

const useOpacity = (marker: IKakaoMarker, opacity: number) => {
  React.useEffect(() => {
    marker.setOpacity(opacity);
  }, [opacity]);
};

const useRange = (marker: IKakaoMarker, range: number) => {
  React.useEffect(() => {
    marker.setRange(range);
  }, [range]);
};

const useAltitude = (marker: IKakaoMarker, altitude: number) => {
  React.useEffect(() => {
    marker.setAltitude(altitude);
  }, [altitude]);
};

const useZIndex = (marker: IKakaoMarker, zIndex: number) => {
  React.useEffect(() => {
    marker.setZIndex(zIndex);
  }, [zIndex]);
};

const useMarkerImage = (marker: IKakaoMarker, markerImage: IKakaoMarkerImage) => {
  React.useEffect(() => {
    markerImage && marker.setImage(markerImage);
  }, [markerImage]);
};

const useClickEvent = (
  marker: IKakaoMarker,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onClick = ({ latLng }: IKakaoMouseEvent) => {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(marker, "click", onClick);

    return () => kakao.maps.event.removeListener(marker, "click", onClick);
  }, []);
};

const useMouseOverEvent = (
  marker: IKakaoMarker,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onMouseOver = ({ latLng }: IKakaoMouseEvent) => {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(marker, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(marker, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  marker: IKakaoMarker,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onMouseOut = ({ latLng }: IKakaoMouseEvent) => {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(marker, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(marker, "mouseout", onMouseOut);
  }, []);
};

export default {
  useInit,
  usePosition,
  useClickable,
  useDraggable,
  useVisible,
  useTitle,
  useOpacity,
  useRange,
  useAltitude,
  useZIndex,
  useMarkerImage,
  useClickEvent,
  useMouseOverEvent,
  useMouseOutEvent,
};
