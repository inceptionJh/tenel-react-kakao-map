import { IKakao, TKakaoStrokeStyles, IKakaoRectangle } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "../Map/context";
import RectangleContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsRectangleProps {
  className?: string;
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

const Rectangle: React.FunctionComponent<IKakaoMapsRectangleProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [rectangle] = React.useState<IKakaoRectangle>(() => {
    return new kakao.maps.Rectangle();
  });

  _hooks.useInit(rectangle, mapCtx.map);
  _hooks.useBounds(rectangle, props.bounds);
  _hooks.useFillColor(rectangle, props.fillColor!);
  _hooks.useFillOpacity(rectangle, props.fillOpacity!);
  _hooks.useStrokeWeight(rectangle, props.strokeWeight!);
  _hooks.useStrokeColor(rectangle, props.strokeColor!);
  _hooks.useStrokeOpacity(rectangle, props.strokeOpacity!);
  _hooks.useStrokeStyle(rectangle, props.strokeStyle!);
  _hooks.useZIndex(rectangle, props.zIndex!);

  _hooks.useClickEvent(rectangle, props.onClick!);
  _hooks.useMouseMoveEvent(rectangle, props.onMouseMove!);
  _hooks.useMouseDownEvent(rectangle, props.onMouseMove!);
  _hooks.useMouseOverEvent(rectangle, props.onMouseOver!);
  _hooks.useMouseOutEvent(rectangle, props.onMouseOut!);

  return (
    <RectangleContext.Provider value={{ rectangle }}>
      {props.children}
    </RectangleContext.Provider>
  );
};

Rectangle.defaultProps = {
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

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

Rectangle.propTypes = {
  /**
   * <p>bounds[0] : Position ( 남서쪽 좌표 )</p>
   * <p>bounds[1] : Position ( 북동쪽 좌표 )</p>
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
