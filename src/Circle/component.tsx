import { IKakao, IKakaoCircle, TKakaoStrokeStyles } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import CircleContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsCircleProps {
  className?: string;
  center: { lat: number, lng: number };
  radius?: number;
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

const Circle: React.FunctionComponent<IKakaoMapsCircleProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [circle] = React.useState<IKakaoCircle>(() => {
    return new kakao.maps.Circle();
  });

  _hooks.useInit(circle, mapCtx.map);
  _hooks.usePosition(circle, props.center);
  _hooks.useRadius(circle, props.radius!);
  _hooks.useFillColor(circle, props.fillColor!);
  _hooks.useFillOpacity(circle, props.fillOpacity!);
  _hooks.useStrokeWeight(circle, props.strokeWeight!);
  _hooks.useStrokeColor(circle, props.strokeColor!);
  _hooks.useStrokeOpacity(circle, props.strokeOpacity!);
  _hooks.useStrokeStyle(circle, props.strokeStyle!);
  _hooks.useZIndex(circle, props.zIndex!);

  _hooks.useClickEvent(circle, props.onClick!);
  _hooks.useMouseMoveEvent(circle, props.onMouseMove!);
  _hooks.useMouseDownEvent(circle, props.onMouseMove!);
  _hooks.useMouseOverEvent(circle, props.onMouseOver!);
  _hooks.useMouseOutEvent(circle, props.onMouseOut!);

  return (
    <CircleContext.Provider value={{ circle }}>
      {props.children}
    </CircleContext.Provider>
  );
};

Circle.defaultProps = {
  radius: 10,
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

export default (() => Circle)();
