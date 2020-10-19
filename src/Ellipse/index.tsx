import * as React from "react";

import PropTypes from "prop-types";

import EllipseContext from "./context";
import MapContext from "../Map/context";

import type { IKakao, TKakaoStrokeStyles, IKakaoEllipse, IKakaoMouseEvent, IKakaoEllipseOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsEllipseProps {
  className?: string;
  position: { lat: number, lng: number };
  rx: number;
  ry: number;
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

function Ellipse(props: React.PropsWithChildren<IKakaoMapsEllipseProps>) {
  const { map } = React.useContext(MapContext);

  const ellipse = React.useMemo<IKakaoEllipse>(() => {
    const options: IKakaoEllipseOptions = {
      center: new kakao.maps.LatLng(props.position.lat, props.position.lng),
      rx: props.rx,
      ry: props.ry,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    const $ellipse = new kakao.maps.Ellipse(options);

    return $ellipse;
  }, []);

  React.useEffect(() => {
    ellipse.setMap(map);
    return () => ellipse.setMap(null);
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
    kakao.maps.event.addListener(ellipse, "click", listeners.current.onClick);
    kakao.maps.event.addListener(ellipse, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener(ellipse, "mousedown", listeners.current.onMouseDown);
    kakao.maps.event.addListener(ellipse, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(ellipse, "mouseout", listeners.current.onMouseOut);

    return () => {
      kakao.maps.event.removeListener(ellipse, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(ellipse, "mousemove", listeners.current.onMouseMove);
      kakao.maps.event.removeListener(ellipse, "mousedown", listeners.current.onMouseDown);
      kakao.maps.event.removeListener(ellipse, "mouseover", listeners.current.onMouseOver);
      kakao.maps.event.removeListener(ellipse, "mouseout", listeners.current.onMouseOut);
    };
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.position.lat, props.position.lng);
    ellipse.setPosition(latlng);
  }, [props.position.lat, props.position.lng]);

  React.useEffect(() => {
    ellipse.setRadius(props.rx, props.ry);
  }, [props.rx, props.ry]);

  React.useEffect(() => {
    ellipse.setOptions({ fillColor: props.fillColor });
  }, [props.fillColor]);

  React.useEffect(() => {
    ellipse.setOptions({ fillOpacity: props.fillOpacity });
  }, [props.fillOpacity]);

  React.useEffect(() => {
    ellipse.setOptions({ strokeWeight: props.strokeWeight });
  }, [props.strokeWeight]);

  React.useEffect(() => {
    ellipse.setOptions({ strokeColor: props.strokeColor });
  }, [props.strokeColor]);

  React.useEffect(() => {
    ellipse.setOptions({ strokeOpacity: props.strokeOpacity });
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    ellipse.setOptions({ strokeStyle: props.strokeStyle });
  }, [props.strokeStyle]);

  React.useEffect(() => {
    ellipse.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  return (
    <EllipseContext.Provider value={{ ellipse }}>
      {props.children}
    </EllipseContext.Provider>
  );
}

Ellipse.defaultProps = {
  fillColor: "transparent",
  fillOpacity: 1,
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  zIndex: 0,
};

Ellipse.propTypes = {
  /** 맵에 표시될 좌표 */
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  /** 단위 : m */
  rx: PropTypes.number.isRequired,
  /** 단위 : m */
  ry: PropTypes.number.isRequired,
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

export default Ellipse;
