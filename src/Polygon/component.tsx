import { IKakao, TKakaoStrokeStyles, IKakaoPolygon } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import PolygonContext from "./context";

import _hooks from "./hooks";

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

const Polygon: React.FunctionComponent<IKakaoMapsPolygonProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [polygon] = React.useState<IKakaoPolygon>(() => {
    return new kakao.maps.Polygon();
  });

  _hooks.useInit(polygon, mapCtx.map);
  _hooks.usePath(polygon, props.path);
  _hooks.useFillColor(polygon, props.fillColor!);
  _hooks.useFillOpacity(polygon, props.fillOpacity!);
  _hooks.useStrokeWeight(polygon, props.strokeWeight!);
  _hooks.useStrokeColor(polygon, props.strokeColor!);
  _hooks.useStrokeOpacity(polygon, props.strokeOpacity!);
  _hooks.useStrokeStyle(polygon, props.strokeStyle!);
  _hooks.useZIndex(polygon, props.zIndex!);

  _hooks.useClickEvent(polygon, props.onClick!);
  _hooks.useMouseMoveEvent(polygon, props.onMouseMove!);
  _hooks.useMouseDownEvent(polygon, props.onMouseMove!);
  _hooks.useMouseOverEvent(polygon, props.onMouseOver!);
  _hooks.useMouseOutEvent(polygon, props.onMouseOut!);

  return (
    <PolygonContext.Provider value={{ polygon }}>
      {props.children}
    </PolygonContext.Provider>
  );
};

Polygon.defaultProps = {
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

export default (() => Polygon)();
