import { IKakao, TKakaoStrokeStyles, IKakaoPolyline } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "../Map/context";
import PolylineContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsPolylineProps {
  className?: string;
  path: { lat: number, lng: number }[];
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

const Polyline: React.FunctionComponent<IKakaoMapsPolylineProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [polyline] = React.useState<IKakaoPolyline>(() => {
    return new kakao.maps.Polyline();
  });

  _hooks.useInit(polyline, mapCtx.map);
  _hooks.usePath(polyline, props.path);
  _hooks.useStrokeWeight(polyline, props.strokeWeight!);
  _hooks.useStrokeColor(polyline, props.strokeColor!);
  _hooks.useStrokeOpacity(polyline, props.strokeOpacity!);
  _hooks.useStrokeStyle(polyline, props.strokeStyle!);
  _hooks.useZIndex(polyline, props.zIndex!);

  _hooks.useClickEvent(polyline, props.onClick!);
  _hooks.useMouseMoveEvent(polyline, props.onMouseMove!);
  _hooks.useMouseDownEvent(polyline, props.onMouseMove!);
  _hooks.useMouseOverEvent(polyline, props.onMouseOver!);
  _hooks.useMouseOutEvent(polyline, props.onMouseOut!);

  return (
    <PolylineContext.Provider value={{ polyline }}>
      {props.children}
    </PolylineContext.Provider>
  );
};

Polyline.defaultProps = {
  strokeColor: "#000",
  strokeWeight: 1,
  strokeOpacity: 1,
  strokeStyle: "solid",
  zIndex: 0,
  onClick: function () { },
  onMouseDown: function () { },
  onMouseMove: function () { },
  onMouseOut: function () { },
  onMouseOver: function () { },
};

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

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
