import * as React from "react";

import PropTypes from "prop-types";

import MapContext from "../Map/context";
import CircleContext from "./context";

import type { IKakao, IKakaoCircle, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoCircleOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsCircleProps {
  className?: string;
  center: { lat: number, lng: number };
  /** 단위 : m */
  radius?: number;
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

function Circle(props: React.PropsWithChildren<IKakaoMapsCircleProps>) {
  const { map } = React.useContext(MapContext);

  const circle = React.useMemo<IKakaoCircle>(() => {
    const options: IKakaoCircleOptions = {
      center: new kakao.maps.LatLng(props.center.lat, props.center.lng),
      radius: props.radius,
      zIndex: props.zIndex,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
    };
    const $circle = new kakao.maps.Circle(options);

    return $circle;
  }, []);

  React.useEffect(() => {
    circle.setMap(map);
    return () => circle.setMap(null);
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
    kakao.maps.event.addListener(circle, "click", listeners.current.onClick);
    kakao.maps.event.addListener(circle, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener(circle, "mousedown", listeners.current.onMouseDown);
    kakao.maps.event.addListener(circle, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(circle, "mouseout", listeners.current.onMouseOut);
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    circle.setPosition(latlng);
  }, [props.center.lat, props.center.lng])

  React.useEffect(() => {
    circle.setRadius(props.radius!);
  }, [props.radius]);

  React.useEffect(() => {
    circle.setOptions({ fillColor: props.fillColor });
  }, [props.fillColor]);

  React.useEffect(() => {
    circle.setOptions({ fillOpacity: props.fillOpacity });
  }, [props.fillOpacity]);

  React.useEffect(() => {
    circle.setOptions({ strokeWeight: props.strokeWeight });
  }, [props.strokeWeight]);

  React.useEffect(() => {
    circle.setOptions({ strokeColor: props.strokeColor });
  }, [props.strokeColor]);

  React.useEffect(() => {
    circle.setOptions({ strokeOpacity: props.strokeOpacity });
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    circle.setOptions({ strokeStyle: props.strokeStyle });
  }, [props.strokeStyle]);

  React.useEffect(() => {
    circle.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  return (
    <CircleContext.Provider value={{ circle }}>
      {props.children}
    </CircleContext.Provider>
  );
}

Circle.defaultProps = {
  radius: 10,
  fillColor: "transparent",
  fillOpacity: 1,
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  zIndex: 0,
};

Circle.propTypes = {
  /** 맵에 표시될 좌표 */
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  /** 단위 : m */
  radius: PropTypes.number,
  /** 채움 색 */
  fillColor: PropTypes.string,
  /** 채움 색의 불투명도 ( 0 ~ 1 ) */
  fillOpacity: PropTypes.number,
  /** 채움 색 */
  strokeColor: PropTypes.string,
  /** 채움 불투명도 ( 0 ~ 1 ) */
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

export default Circle;
