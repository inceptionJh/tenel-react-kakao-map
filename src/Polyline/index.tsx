import { IKakao, TKakaoStrokeStyles, IKakaoPolyline, IKakaoMouseEvent, IKakaoPolylineOptions } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import PolylineContext from "./context";
import MapContext from "../Map/context";

declare var kakao: IKakao;

export interface IKakaoMapsPolylineProps {
  className?: string;
  path: { lat: number, lng: number }[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: TKakaoStrokeStyles;
  endArrow?: boolean;
  zIndex?: number;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseDown?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseMove?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
  onPolylineLengthChange?: (length: number) => void;
}

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

function Polyline(props: React.PropsWithChildren<IKakaoMapsPolylineProps>) {
  const { map } = React.useContext(MapContext);

  const polyline = React.useMemo<IKakaoPolyline>(() => {
    const options: IKakaoPolylineOptions = {
      path: props.path.map((point) => new kakao.maps.LatLng(point.lat, point.lng)),
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      endArrow: props.endArrow,
      zIndex: props.zIndex,
    };
    const $polyline = new kakao.maps.Polyline(options);

    return $polyline;
  }, []);

  React.useEffect(() => {
    polyline.setMap(map);
    return () => polyline.setMap(null);
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
    kakao.maps.event.addListener(polyline, "click", listeners.current.onClick);
    kakao.maps.event.addListener(polyline, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener(polyline, "mousedown", listeners.current.onMouseDown);
    kakao.maps.event.addListener(polyline, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(polyline, "mouseout", listeners.current.onMouseOut);

    return () => {
      kakao.maps.event.removeListener(polyline, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(polyline, "mousemove", listeners.current.onMouseMove);
      kakao.maps.event.removeListener(polyline, "mousedown", listeners.current.onMouseDown);
      kakao.maps.event.removeListener(polyline, "mouseover", listeners.current.onMouseOver);
      kakao.maps.event.removeListener(polyline, "mouseout", listeners.current.onMouseOut);
    };
  }, []);

  React.useEffect(() => {
    props.onPolylineLengthChange?.(polyline.getLength());

    polyline.setPath(props.path.map((position) => {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }));
  }, [props.path]);

  React.useEffect(() => {
    polyline.setOptions({ strokeColor: props.strokeColor });
  }, [props.strokeColor]);

  React.useEffect(() => {
    polyline.setOptions({ strokeWeight: props.strokeWeight });
  }, [props.strokeWeight]);

  React.useEffect(() => {
    polyline.setOptions({ strokeOpacity: props.strokeOpacity });
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    polyline.setOptions({ strokeStyle: props.strokeStyle });
  }, [props.strokeStyle]);

  React.useEffect(() => {
    polyline.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  return (
    <PolylineContext.Provider value={{ polyline }}>
      {props.children}
    </PolylineContext.Provider >
  );
}

Polyline.defaultProps = {
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  endArrow: false,
  zIndex: 0,
};

Polyline.propTypes = {
  /** Position : { lat: number, lng: number } */
  path: PropTypes.arrayOf(Position).isRequired,
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

export default Polyline;
