import { IKakaoPolygon, IKakao, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useInit = (polygon: IKakaoPolygon, map: IKakaoMap) => {
  React.useEffect(() => {
    polygon.setMap(map);
    return () => polygon.setMap(null);
  }, []);
};

const usePath = (polygon: IKakaoPolygon, path: { lat: number, lng: number }[][]) => {
  React.useEffect(() => {
    polygon.setPath(path.map((positions) => {
      return positions.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng);
      });
    }));
  }, [path]);
};

const useFillColor = (polygon: IKakaoPolygon, fillColor: string) => {
  React.useEffect(() => {
    polygon.setOptions({ fillColor });
  }, [fillColor]);
};

const useFillOpacity = (polygon: IKakaoPolygon, fillOpacity: number) => {
  React.useEffect(() => {
    polygon.setOptions({ fillOpacity });
  }, [fillOpacity]);
};

const useStrokeWeight = (polygon: IKakaoPolygon, strokeWeight: number) => {
  React.useEffect(() => {
    polygon.setOptions({ strokeWeight });
  }, [strokeWeight]);
};

const useStrokeColor = (polygon: IKakaoPolygon, strokeColor: string) => {
  React.useEffect(() => {
    polygon.setOptions({ strokeColor });
  }, [strokeColor]);
};

const useStrokeOpacity = (polygon: IKakaoPolygon, strokeOpacity: number) => {
  React.useEffect(() => {
    polygon.setOptions({ strokeOpacity });
  }, [strokeOpacity]);
};

const useStrokeStyle = (polygon: IKakaoPolygon, strokeStyle: TKakaoStrokeStyles) => {
  React.useEffect(() => {
    polygon.setOptions({ strokeStyle });
  }, [strokeStyle]);
};

const useZIndex = (polygon: IKakaoPolygon, zIndex: number) => {
  React.useEffect(() => {
    polygon.setZIndex(zIndex);
  }, [zIndex]);
};

const useClickEvent = (
  polygon: IKakaoPolygon,
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
    kakao.maps.event.addListener(polygon, "click", onClick);

    return () => kakao.maps.event.removeListener(polygon, "click", onClick);
  }, []);
};

const useMouseMoveEvent = (
  polygon: IKakaoPolygon,
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
    kakao.maps.event.addListener(polygon, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(polygon, "mousemove", onMouseMove);
  }, []);
};

const useMouseDownEvent = (
  polygon: IKakaoPolygon,
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
    kakao.maps.event.addListener(polygon, "mousedown", onMouseMove);

    return () => kakao.maps.event.removeListener(polygon, "mousedown", onMouseMove);
  }, []);
};

const useMouseOverEvent = (
  polygon: IKakaoPolygon,
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
    kakao.maps.event.addListener(polygon, "mouseover", onMouseOver);

    return () => kakao.maps.event.removeListener(polygon, "mouseover", onMouseOver);
  }, []);
};

const useMouseOutEvent = (
  polygon: IKakaoPolygon,
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
    kakao.maps.event.addListener(polygon, "mouseout", onMouseOut);

    return () => kakao.maps.event.removeListener(polygon, "mouseout", onMouseOut);
  }, []);
};

export default {
  useInit,
  usePath,
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
