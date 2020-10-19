import * as React from "react";

import PropTypes from "prop-types";

import RectangleContext from "./context";
import MapContext from "../Map/context";

import type { IKakao, TKakaoStrokeStyles, IKakaoRectangle, IKakaoMouseEvent, IKakaoRectangleOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsRectangleProps {
  className?: string;
  /** [SW, NE] */
  bounds: [{ lat: number, lng: number }, { lat: number, lng: number }];
  fillColor?: string;
  fillOpacity?: number;
  /** 단위 : px */
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

function Rectangle(props: React.PropsWithChildren<IKakaoMapsRectangleProps>) {
  const { map } = React.useContext(MapContext);

  const rectangle = React.useMemo<IKakaoRectangle>(() => {
    const sw = new kakao.maps.LatLng(props.bounds[0].lat, props.bounds[0].lng);
    const ne = new kakao.maps.LatLng(props.bounds[1].lat, props.bounds[1].lng);
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    const options: IKakaoRectangleOptions = {
      bounds,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    const $rectangle = new kakao.maps.Rectangle(options);

    return $rectangle;
  }, []);

  React.useEffect(() => {
    rectangle.setMap(map);
    return () => rectangle.setMap(null);
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
    kakao.maps.event.addListener(rectangle, "click", listeners.current.onClick);
    kakao.maps.event.addListener(rectangle, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener(rectangle, "mousedown", listeners.current.onMouseDown);
    kakao.maps.event.addListener(rectangle, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(rectangle, "mouseout", listeners.current.onMouseOut);

    return () => {
      kakao.maps.event.removeListener(rectangle, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(rectangle, "mousemove", listeners.current.onMouseMove);
      kakao.maps.event.removeListener(rectangle, "mousedown", listeners.current.onMouseDown);
      kakao.maps.event.removeListener(rectangle, "mouseover", listeners.current.onMouseOver);
      kakao.maps.event.removeListener(rectangle, "mouseout", listeners.current.onMouseOut);
    };
  }, []);

  React.useEffect(() => {
    const sw = new kakao.maps.LatLng(props.bounds[0].lat, props.bounds[0].lng);
    const ne = new kakao.maps.LatLng(props.bounds[1].lat, props.bounds[1].lng);
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    rectangle.setBounds(bounds);
  }, [props.bounds.flat(Infinity).join(",")]);

  React.useEffect(() => {
    rectangle.setOptions({ fillColor: props.fillColor });
  }, [props.fillColor]);

  React.useEffect(() => {
    rectangle.setOptions({ fillOpacity: props.fillOpacity });
  }, [props.fillOpacity]);

  React.useEffect(() => {
    rectangle.setOptions({ strokeColor: props.strokeColor });
  }, [props.strokeColor]);

  React.useEffect(() => {
    rectangle.setOptions({ strokeWeight: props.strokeWeight });
  }, [props.strokeWeight]);

  React.useEffect(() => {
    rectangle.setOptions({ strokeOpacity: props.strokeOpacity });
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    rectangle.setOptions({ strokeStyle: props.strokeStyle });
  }, [props.strokeStyle]);

  React.useEffect(() => {
    rectangle.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  return (
    <RectangleContext.Provider value={{ rectangle }}>
      {props.children}
    </RectangleContext.Provider>
  );
}

Rectangle.defaultProps = {
  fillColor: "transparent",
  fillOpacity: 1,
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  zIndex: 0,
};

Rectangle.propTypes = {
  /**
   * bounds[0] : Position ( SW )
   * bounds[1] : Position ( NE )
   */
  bounds: PropTypes.arrayOf(Position).isRequired as PropTypes.Validator<[
    PropTypes.InferProps<{
      lat: PropTypes.Validator<number>;
      lng: PropTypes.Validator<number>;
    }>,
    PropTypes.InferProps<{
      lat: PropTypes.Validator<number>;
      lng: PropTypes.Validator<number>;
    }>
  ]>,
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

export default Rectangle;
