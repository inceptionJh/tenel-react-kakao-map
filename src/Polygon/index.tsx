import { IKakao, TKakaoStrokeStyles, IKakaoPolygon, IKakaoMouseEvent, IKakaoPolygonOptions } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import MapContext from "../Map/context";
import PolygonContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsPolygonProps {
  className?: string;
  path: { lat: number, lng: number }[][] | { lat: number, lng: number }[];
  fillColor?: string;
  fillOpacity?: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: TKakaoStrokeStyles;
  zIndex?: number;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseDown?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseMove?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
}

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

function Polygon(props: React.PropsWithChildren<IKakaoMapsPolygonProps>) {
  const { map } = React.useContext(MapContext);

  const polygon = React.useMemo<IKakaoPolygon>(() => {
    const path = (props.path as any).map((positionOrPath: { lat: number, lng: number } | { lat: number, lng: number }[]) => {
      if ("lat" in positionOrPath) {
        return new kakao.maps.LatLng(positionOrPath.lat, positionOrPath.lng);
      } else {
        return positionOrPath.map((position) => {
          return new kakao.maps.LatLng(position.lat, position.lng);
        });
      }
    });
    const options: IKakaoPolygonOptions = {
      path,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    const $polygon = new kakao.maps.Polygon(options);

    return $polygon;
  }, []);

  React.useEffect(() => {
    polygon.setMap(map);
    return () => polygon.setMap(null);
  }, []);

  const listeners = React.useRef<{ [listener: string]: (...args: any[]) => void }>({});

  listeners.current.onClick = function onClick(e: IKakaoMouseEvent) {
    props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onMouseMove = function onMouseMove(e: IKakaoMouseEvent) {
    props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onMouseDown = function onMouseDown(e: IKakaoMouseEvent) {
    props.onMouseDown?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onMouseOver = function onMouseOver(e: IKakaoMouseEvent) {
    props.onMouseOver?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onMouseOut = function onMouseOut(e: IKakaoMouseEvent) {
    props.onMouseOut?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  React.useEffect(() => {
    kakao.maps.event.addListener(polygon, "click", listeners.current.onClick);
    kakao.maps.event.addListener(polygon, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener(polygon, "mousedown", listeners.current.onMouseDown);
    kakao.maps.event.addListener(polygon, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(polygon, "mouseout", listeners.current.onMouseOut);

    return () => {
      kakao.maps.event.removeListener(polygon, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(polygon, "mousemove", listeners.current.onMouseMove);
      kakao.maps.event.removeListener(polygon, "mousedown", listeners.current.onMouseDown);
      kakao.maps.event.removeListener(polygon, "mouseover", listeners.current.onMouseOver);
      kakao.maps.event.removeListener(polygon, "mouseout", listeners.current.onMouseOut);
    };
  }, []);

  React.useEffect(() => {
    polygon.setOptions({ fillColor: props.fillColor });
  }, [props.fillColor]);

  React.useEffect(() => {
    polygon.setOptions({ fillOpacity: props.fillOpacity });
  }, [props.fillOpacity]);

  React.useEffect(() => {
    polygon.setOptions({ strokeColor: props.strokeColor });
  }, [props.strokeColor]);

  React.useEffect(() => {
    polygon.setOptions({ strokeWeight: props.strokeWeight });
  }, [props.strokeWeight]);

  React.useEffect(() => {
    polygon.setOptions({ strokeOpacity: props.strokeOpacity });
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    polygon.setOptions({ strokeStyle: props.strokeStyle });
  }, [props.strokeStyle]);

  React.useEffect(() => {
    polygon.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  return (
    <PolygonContext.Provider value={{ polygon }}>
      {props.children}
    </PolygonContext.Provider >
  );
}

Polygon.defaultProps = {
  fillColor: "transparent",
  fillOpacity: 1,
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  zIndex: 0,
};

Polygon.propTypes = {
  /** Position : { lat: number, lng: number } */
  path: PropTypes.oneOfType([
    PropTypes.arrayOf(Position).isRequired,
    PropTypes.arrayOf(PropTypes.arrayOf(Position).isRequired).isRequired,
  ]).isRequired,
  /** 채움 색 */
  fillColor: PropTypes.string,
  /** 채움 색의 불투명도 ( 0 ~ 1 ) */
  fillOpacity: PropTypes.number,
  /** 선 색 */
  strokeColor: PropTypes.string,
  /** 선 불투명도 ( 0 ~ 1 ) */
  strokeOpacity: PropTypes.number,
  /** 선의 두께 ( 단위 : px ) */
  strokeWeight: PropTypes.number,
  /** 선 스타일 */
  strokeStyle: PropTypes.oneOf(["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"]),
  /** z-index 속성 값 */
  zIndex: PropTypes.number,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onClick: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseDown: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseMove: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseOver: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseOut: PropTypes.func,
};

export default Polygon;
