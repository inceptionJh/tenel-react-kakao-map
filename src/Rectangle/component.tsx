import { IKakao, TKakaoStrokeStyles, IKakaoRectangle, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import RectangleContext from "./context";

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
  onClick?: (e: IKakaoMouseEvent) => void;
  onMouseDown?: (e: IKakaoMouseEvent) => void;
  onMouseMove?: (e: IKakaoMouseEvent) => void;
  onMouseOut?: (e: IKakaoMouseEvent) => void;
  onMouseOver?: (e: IKakaoMouseEvent) => void;
}

const Rectangle: React.FunctionComponent<IKakaoMapsRectangleProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [rectangle] = React.useState<IKakaoRectangle>(() => {
    return new kakao.maps.Rectangle();
  });

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(rectangle, "click", props.onClick);
    props.onMouseDown && kakao.maps.event.addListener(rectangle, "mousedown", props.onMouseDown);
    props.onMouseMove && kakao.maps.event.addListener(rectangle, "mousemove", props.onMouseMove);
    props.onMouseOut && kakao.maps.event.addListener(rectangle, "mouseout", props.onMouseOut);
    props.onMouseOver && kakao.maps.event.addListener(rectangle, "mouseover", props.onMouseOver);

    return () => {
      props.onClick && kakao.maps.event.removeListener(rectangle, "click", props.onClick);
      props.onMouseDown && kakao.maps.event.removeListener(rectangle, "mousedown", props.onMouseDown);
      props.onMouseMove && kakao.maps.event.removeListener(rectangle, "mousemove", props.onMouseMove);
      props.onMouseOut && kakao.maps.event.removeListener(rectangle, "mouseout", props.onMouseOut);
      props.onMouseOver && kakao.maps.event.removeListener(rectangle, "mouseover", props.onMouseOver);
    };
  }, []);

  React.useEffect(() => {
    rectangle.setMap(mapCtx.map);
    return () => rectangle.setMap(null);
  }, []);

  React.useEffect(() => {
    const sw = new kakao.maps.LatLng(props.bounds[0].lat, props.bounds[0].lng);
    const ne = new kakao.maps.LatLng(props.bounds[1].lat, props.bounds[1].lng);
    const bound = new kakao.maps.LatLngBounds(sw, ne);
    rectangle.setBounds(bound);
  }, [props.bounds]);

  React.useEffect(() => {
    props.fillColor !== undefined ? rectangle.setOptions({ fillColor: props.fillColor }) : null;
  }, [props.fillColor]);

  React.useEffect(() => {
    props.fillOpacity !== undefined ? rectangle.setOptions({ fillOpacity: props.fillOpacity }) : null;
  }, [props.fillOpacity]);

  React.useEffect(() => {
    props.strokeWeight !== undefined ? rectangle.setOptions({ strokeWeight: props.strokeWeight }) : null;
  }, [props.strokeWeight]);

  React.useEffect(() => {
    props.strokeColor !== undefined ? rectangle.setOptions({ strokeColor: props.strokeColor }) : null;
  }, [props.strokeColor]);

  React.useEffect(() => {
    props.strokeOpacity !== undefined ? rectangle.setOptions({ strokeOpacity: props.strokeOpacity }) : null;
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    props.strokeStyle !== undefined ? rectangle.setOptions({ strokeStyle: props.strokeStyle }) : null;
  }, [props.strokeStyle]);

  React.useEffect(() => {
    props.zIndex !== undefined ? rectangle.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  return (
    <RectangleContext.Provider value={{ rectangle }}>
      {props.children}
    </RectangleContext.Provider>
  );
};

export default (() => Rectangle)();
