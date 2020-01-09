import { IKakao, IKakaoCircle, TKakaoStrokeStyles, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import CircleContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsCircleProps {
  className?: string;
  center: { lat: number, lng: number };
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: TKakaoStrokeStyles;
  zIndex?: number;
  onClick?: (e: IKakaoMouseEvent) => void;
  onMouseDown?: (e: IKakaoMouseEvent) => void;
  onMouseMove?: (e: IKakaoMouseEvent) => void;
  onMouseOver?: (e: IKakaoMouseEvent) => void;
  onMouseOut?: (e: IKakaoMouseEvent) => void;
}

const Circle: React.FunctionComponent<IKakaoMapsCircleProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [circle] = React.useState<IKakaoCircle>(() => {
    return new kakao.maps.Circle();
  });

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(circle, "click", props.onClick);
    props.onMouseDown && kakao.maps.event.addListener(circle, "mousedown", props.onMouseDown);
    props.onMouseMove && kakao.maps.event.addListener(circle, "mousemove", props.onMouseMove);
    props.onMouseOver && kakao.maps.event.addListener(circle, "mouseover", props.onMouseOver);
    props.onMouseOut && kakao.maps.event.addListener(circle, "mouseout", props.onMouseOut);

    return () => {
      props.onClick && kakao.maps.event.removeListener(circle, "click", props.onClick);
      props.onMouseDown && kakao.maps.event.removeListener(circle, "mousedown", props.onMouseDown);
      props.onMouseMove && kakao.maps.event.removeListener(circle, "mousemove", props.onMouseMove);
      props.onMouseOver && kakao.maps.event.removeListener(circle, "mouseover", props.onMouseOver);
      props.onMouseOut && kakao.maps.event.removeListener(circle, "mouseout", props.onMouseOut);
    };
  }, []);

  React.useEffect(() => {
    circle.setMap(mapCtx.map);
    return () => circle.setMap(null);
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    circle.setPosition(latlng);
  }, [props.center]);

  React.useEffect(() => {
    props.fillColor !== undefined ? circle.setOptions({ fillColor: props.fillColor }) : null;
  }, [props.fillColor]);

  React.useEffect(() => {
    props.fillOpacity !== undefined ? circle.setOptions({ fillOpacity: props.fillOpacity }) : null;
  }, [props.fillOpacity]);

  React.useEffect(() => {
    props.radius !== undefined ? circle.setRadius(props.radius) : null;
  }, [props.radius]);

  React.useEffect(() => {
    props.strokeWeight !== undefined ? circle.setOptions({ strokeWeight: props.strokeWeight }) : null;
  }, [props.strokeWeight]);

  React.useEffect(() => {
    props.strokeColor !== undefined ? circle.setOptions({ strokeColor: props.strokeColor }) : null;
  }, [props.strokeColor]);

  React.useEffect(() => {
    props.strokeOpacity !== undefined ? circle.setOptions({ strokeOpacity: props.strokeOpacity }) : null;
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    props.strokeStyle !== undefined ? circle.setOptions({ strokeStyle: props.strokeStyle }) : null;
  }, [props.strokeStyle]);

  React.useEffect(() => {
    props.zIndex !== undefined ? circle.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  return (
    <CircleContext.Provider value={{ circle }}>
      {props.children}
    </CircleContext.Provider>
  );
};

export default (() => Circle)();
