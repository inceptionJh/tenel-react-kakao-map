import { IKakao, TKakaoStrokeStyles, IKakaoEllipse } from "tenel-kakao-map";

import * as React from "react";

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
  onClick: () => undefined,
  onMouseDown: () => undefined,
  onMouseMove: () => undefined,
  onMouseOut: () => undefined,
  onMouseOver: () => undefined,
};

export default (() => Ellipse)();
