import { IKakaoPolyline, IKakao, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (polyline: IKakaoPolyline, map: IKakaoMap) => {
  React.useEffect(() => {
    polyline.setMap(map);
    return () => polyline.setMap(null);
  }, []);
};

const usePath = (polyline: IKakaoPolyline, path: { lat: number, lng: number }[]) => {
  React.useEffect(() => {
    polyline.setPath(path.map((position) => {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }));
  }, [path]);
};

const useStrokeWeight = (polyline: IKakaoPolyline, strokeWeight: number) => {
  React.useEffect(() => {
    polyline.setOptions({ strokeWeight });
  }, [strokeWeight]);
};

const useStrokeColor = (polyline: IKakaoPolyline, strokeColor: string) => {
  React.useEffect(() => {
    polyline.setOptions({ strokeColor });
  }, [strokeColor]);
};

const useStrokeOpacity = (polyline: IKakaoPolyline, strokeOpacity: number) => {
  React.useEffect(() => {
    polyline.setOptions({ strokeOpacity });
  }, [strokeOpacity]);
};

const useStrokeStyle = (polyline: IKakaoPolyline, strokeStyle: TKakaoStrokeStyles) => {
  React.useEffect(() => {
    polyline.setOptions({ strokeStyle });
  }, [strokeStyle]);
};

const useZIndex = (polyline: IKakaoPolyline, zIndex: number) => {
  React.useEffect(() => {
    polyline.setZIndex(zIndex);
  }, [zIndex]);
};

const useClickEvent = (
  polyline: IKakaoPolyline,
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
    kakao.maps.event.addListener(polyline, "click", onClick);

    return () => kakao.maps.event.removeListener(polyline, "click", onClick);
  }, []);
};

const useMouseMoveEvent = (
  polyline: IKakaoPolyline,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onMouseMove = ({ latLng }: IKakaoMouseEvent) => {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(polyline, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(polyline, "mousemove", onMouseMove);
  }, []);
};

const useMouseDownEvent = (
  polyline: IKakaoPolyline,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onMouseMove = ({ latLng }: IKakaoMouseEvent) => {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(polyline, "mousedown", onMouseMove);

    return () => kakao.maps.event.removeListener(polyline, "mousedown", onMouseMove);
  }, []);
};

const useMouseOverEvent = (
  polyline: IKakaoPolyline,
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
    kakao.maps.event.addListener(polyline, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(polyline, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  polyline: IKakaoPolyline,
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
    kakao.maps.event.addListener(polyline, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(polyline, "mouseout", onMouseOut);
  }, []);
};

export default {
  useInit,
  usePath,
  useStrokeWeight,
  useStrokeColor,
  useStrokeOpacity,
  useStrokeStyle,
  useZIndex,
  useClickEvent,
  useMouseMoveEvent,
  useMouseDownEvent,
  useMouseOverEvent,
  useMouseOutEvent,
};
