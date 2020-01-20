import { IKakao, TKakaoStrokeStyles, IKakaoEllipse } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "../Map/context";
import EllipseContext from "./context";

import _hooks from "./hooks";

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

const Ellipse: React.FunctionComponent<IKakaoMapsEllipseProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [ellipse] = React.useState<IKakaoEllipse>(() => {
    return new kakao.maps.Ellipse({ rx: props.rx, ry: props.ry });
  });

  _hooks.useInit(ellipse, mapCtx.map);
  _hooks.usePosition(ellipse, props.position);
  _hooks.useRadius(ellipse, { rx: props.rx, ry: props.ry });
  _hooks.useFillColor(ellipse, props.fillColor!);
  _hooks.useFillOpacity(ellipse, props.fillOpacity!);
  _hooks.useStrokeWeight(ellipse, props.strokeWeight!);
  _hooks.useStrokeColor(ellipse, props.strokeColor!);
  _hooks.useStrokeOpacity(ellipse, props.strokeOpacity!);
  _hooks.useStrokeStyle(ellipse, props.strokeStyle!);
  _hooks.useZIndex(ellipse, props.zIndex!);

  _hooks.useClickEvent(ellipse, props.onClick!);
  _hooks.useMouseMoveEvent(ellipse, props.onMouseMove!);
  _hooks.useMouseDownEvent(ellipse, props.onMouseMove!);
  _hooks.useMouseOverEvent(ellipse, props.onMouseOver!);
  _hooks.useMouseOutEvent(ellipse, props.onMouseOut!);

  return (
    <EllipseContext.Provider value={{ ellipse }}>
      {props.children}
    </EllipseContext.Provider>
  );
};

Ellipse.defaultProps = {
  fillColor: "transparent",
  fillOpacity: 1,
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
