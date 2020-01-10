import { IKakaoRectangle, IKakao, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (rectangle: IKakaoRectangle, map: IKakaoMap) => {
  React.useEffect(() => {
    rectangle.setMap(map);
    return () => rectangle.setMap(null);
  }, []);
};

const useBounds = (rectangle: IKakaoRectangle, bounds: [{ lat: number, lng: number }, { lat: number, lng: number }]) => {
  React.useEffect(() => {
    const sw = new kakao.maps.LatLng(bounds[0].lat, bounds[0].lng);
    const ne = new kakao.maps.LatLng(bounds[1].lat, bounds[1].lng);
    const bound = new kakao.maps.LatLngBounds(sw, ne);
    rectangle.setBounds(bound);
  }, [bounds]);
};

const useFillColor = (rectangle: IKakaoRectangle, fillColor: string) => {
  React.useEffect(() => {
    rectangle.setOptions({ fillColor });
  }, [fillColor]);
};

const useFillOpacity = (rectangle: IKakaoRectangle, fillOpacity: number) => {
  React.useEffect(() => {
    rectangle.setOptions({ fillOpacity });
  }, [fillOpacity]);
};

const useStrokeWeight = (rectangle: IKakaoRectangle, strokeWeight: number) => {
  React.useEffect(() => {
    rectangle.setOptions({ strokeWeight });
  }, [strokeWeight]);
};

const useStrokeColor = (rectangle: IKakaoRectangle, strokeColor: string) => {
  React.useEffect(() => {
    rectangle.setOptions({ strokeColor });
  }, [strokeColor]);
};

const useStrokeOpacity = (rectangle: IKakaoRectangle, strokeOpacity: number) => {
  React.useEffect(() => {
    rectangle.setOptions({ strokeOpacity });
  }, [strokeOpacity]);
};

const useStrokeStyle = (rectangle: IKakaoRectangle, strokeStyle: TKakaoStrokeStyles) => {
  React.useEffect(() => {
    rectangle.setOptions({ strokeStyle });
  }, [strokeStyle]);
};

const useZIndex = (rectangle: IKakaoRectangle, zIndex: number) => {
  React.useEffect(() => {
    rectangle.setZIndex(zIndex);
  }, [zIndex]);
};

const useClickEvent = (
  rectangle: IKakaoRectangle,
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
    kakao.maps.event.addListener(rectangle, "click", onClick);

    return () => kakao.maps.event.removeListener(rectangle, "click", onClick);
  }, []);
};

const useMouseMoveEvent = (
  rectangle: IKakaoRectangle,
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
    kakao.maps.event.addListener(rectangle, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(rectangle, "mousemove", onMouseMove);
  }, []);
};

const useMouseDownEvent = (
  rectangle: IKakaoRectangle,
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
    kakao.maps.event.addListener(rectangle, "mousedown", onMouseMove);

    return () => kakao.maps.event.removeListener(rectangle, "mousedown", onMouseMove);
  }, []);
};

const useMouseOverEvent = (
  rectangle: IKakaoRectangle,
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
    kakao.maps.event.addListener(rectangle, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(rectangle, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  rectangle: IKakaoRectangle,
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
    kakao.maps.event.addListener(rectangle, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(rectangle, "mouseout", onMouseOut);
  }, []);
};

export default {
  useInit,
  useBounds,
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
