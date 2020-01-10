import { IKakao, TKakaoStrokeStyles, IKakaoPolyline, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

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
  onClick: () => undefined,
  onMouseDown: () => undefined,
  onMouseMove: () => undefined,
  onMouseOut: () => undefined,
  onMouseOver: () => undefined,
};

export default (() => Polyline)();
