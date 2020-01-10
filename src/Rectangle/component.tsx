import { IKakao, TKakaoStrokeStyles, IKakaoRectangle } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import RectangleContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsRectangleProps {
  className?: string;
  bounds: [{ lat: number, lng: number }, { lat: number, lng: number }];
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
  onClick: () => undefined,
  onMouseDown: () => undefined,
  onMouseMove: () => undefined,
  onMouseOut: () => undefined,
  onMouseOver: () => undefined,
};

export default (() => Rectangle)();
