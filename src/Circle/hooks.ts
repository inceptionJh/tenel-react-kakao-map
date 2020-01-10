import { IKakaoCircle, IKakao, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (circle: IKakaoCircle, map: IKakaoMap) => {
  React.useEffect(() => {
    circle.setMap(map);
    return () => circle.setMap(null);
  }, []);
};

const usePosition = (circle: IKakaoCircle, position: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    circle.setPosition(latlng);
  }, [position]);
};

const useRadius = (circle: IKakaoCircle, radius: number) => {
  React.useEffect(() => {
    circle.setRadius(radius);
  }, [radius]);
};

const useFillColor = (circle: IKakaoCircle, fillColor: string) => {
  React.useEffect(() => {
    circle.setOptions({ fillColor });
  }, [fillColor]);
};

const useFillOpacity = (circle: IKakaoCircle, fillOpacity: number) => {
  React.useEffect(() => {
    circle.setOptions({ fillOpacity });
  }, [fillOpacity]);
};

const useStrokeWeight = (circle: IKakaoCircle, strokeWeight: number) => {
  React.useEffect(() => {
    circle.setOptions({ strokeWeight });
  }, [strokeWeight]);
};

const useStrokeColor = (circle: IKakaoCircle, strokeColor: string) => {
  React.useEffect(() => {
    circle.setOptions({ strokeColor });
  }, [strokeColor]);
};

const useStrokeOpacity = (circle: IKakaoCircle, strokeOpacity: number) => {
  React.useEffect(() => {
    circle.setOptions({ strokeOpacity });
  }, [strokeOpacity]);
};

const useStrokeStyle = (circle: IKakaoCircle, strokeStyle: TKakaoStrokeStyles) => {
  React.useEffect(() => {
    circle.setOptions({ strokeStyle });
  }, [strokeStyle]);
};

const useZIndex = (circle: IKakaoCircle, zIndex: number) => {
  React.useEffect(() => {
    circle.setZIndex(zIndex);
  }, [zIndex]);
};

const useClickEvent = (
  circle: IKakaoCircle,
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
    kakao.maps.event.addListener(circle, "click", onClick);

    return () => kakao.maps.event.removeListener(circle, "click", onClick);
  }, []);
};

const useMouseMoveEvent = (
  circle: IKakaoCircle,
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
    kakao.maps.event.addListener(circle, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(circle, "mousemove", onMouseMove);
  }, []);
};

const useMouseDownEvent = (
  circle: IKakaoCircle,
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
    kakao.maps.event.addListener(circle, "mousedown", onMouseMove);

    return () => kakao.maps.event.removeListener(circle, "mousedown", onMouseMove);
  }, []);
};

const useMouseOverEvent = (
  circle: IKakaoCircle,
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
    kakao.maps.event.addListener(circle, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(circle, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  circle: IKakaoCircle,
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
    kakao.maps.event.addListener(circle, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(circle, "mouseout", onMouseOut);
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
