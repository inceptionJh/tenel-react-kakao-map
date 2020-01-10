import { IKakaoEllipse, IKakao, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (circle: IKakaoEllipse, map: IKakaoMap) => {
  React.useEffect(() => {
    circle.setMap(map);
    return () => circle.setMap(null);
  }, []);
};

const usePosition = (ellipse: IKakaoEllipse, position: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    ellipse.setPosition(latlng);
  }, [position]);
};

const useRadius = (ellipse: IKakaoEllipse, radius: { rx: number, ry: number }) => {
  React.useEffect(() => {
    ellipse.setRadius(radius.rx, radius.ry);
  }, [radius.rx, radius.ry]);
};

const useFillColor = (ellipse: IKakaoEllipse, fillColor: string) => {
  React.useEffect(() => {
    ellipse.setOptions({ fillColor });
  }, [fillColor]);
};

const useFillOpacity = (ellipse: IKakaoEllipse, fillOpacity: number) => {
  React.useEffect(() => {
    ellipse.setOptions({ fillOpacity });
  }, [fillOpacity]);
};

const useStrokeWeight = (ellipse: IKakaoEllipse, strokeWeight: number) => {
  React.useEffect(() => {
    ellipse.setOptions({ strokeWeight });
  }, [strokeWeight]);
};

const useStrokeColor = (ellipse: IKakaoEllipse, strokeColor: string) => {
  React.useEffect(() => {
    ellipse.setOptions({ strokeColor });
  }, [strokeColor]);
};

const useStrokeOpacity = (ellipse: IKakaoEllipse, strokeOpacity: number) => {
  React.useEffect(() => {
    ellipse.setOptions({ strokeOpacity });
  }, [strokeOpacity]);
};

const useStrokeStyle = (ellipse: IKakaoEllipse, strokeStyle: TKakaoStrokeStyles) => {
  React.useEffect(() => {
    ellipse.setOptions({ strokeStyle });
  }, [strokeStyle]);
};

const useZIndex = (ellipse: IKakaoEllipse, zIndex: number) => {
  React.useEffect(() => {
    ellipse.setZIndex(zIndex);
  }, [zIndex]);
};

const useClickEvent = (
  ellipse: IKakaoEllipse,
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
    kakao.maps.event.addListener(ellipse, "click", onClick);

    return () => kakao.maps.event.removeListener(ellipse, "click", onClick);
  }, []);
};

const useMouseMoveEvent = (
  ellipse: IKakaoEllipse,
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
    kakao.maps.event.addListener(ellipse, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(ellipse, "mousemove", onMouseMove);
  }, []);
};

const useMouseDownEvent = (
  ellipse: IKakaoEllipse,
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
    kakao.maps.event.addListener(ellipse, "mousedown", onMouseMove);

    return () => kakao.maps.event.removeListener(ellipse, "mousedown", onMouseMove);
  }, []);
};

const useMouseOverEvent = (
  ellipse: IKakaoEllipse,
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
    kakao.maps.event.addListener(ellipse, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(ellipse, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  ellipse: IKakaoEllipse,
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
    kakao.maps.event.addListener(ellipse, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(ellipse, "mouseout", onMouseOut);
  }, []);
};

export default {
  useInit,
  usePosition,
  useRadius,
  useFillColor,
  useFillOpacity,
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
