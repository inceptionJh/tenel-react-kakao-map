import { IKakao, TKakaoStrokeStyles, IKakaoPolyline, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import PolylineContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsPolylineProps {
  className?: string;
  path: { lat: number, lng: number }[];
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

const Polyline: React.FunctionComponent<IKakaoMapsPolylineProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [polyline] = React.useState<IKakaoPolyline>(() => {
    return new kakao.maps.Polyline();
  });

  React.useEffect(() => {
    polyline.setMap(mapCtx.map);
    return () => polyline.setMap(null);
  }, []);

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(polyline, "click", props.onClick);
    props.onMouseDown && kakao.maps.event.addListener(polyline, "mousedown", props.onMouseDown);
    props.onMouseMove && kakao.maps.event.addListener(polyline, "mousemove", props.onMouseMove);
    props.onMouseOut && kakao.maps.event.addListener(polyline, "mouseout", props.onMouseOut);
    props.onMouseOver && kakao.maps.event.addListener(polyline, "mouseover", props.onMouseOver);

    return () => {
      props.onClick && kakao.maps.event.removeListener(polyline, "click", props.onClick);
      props.onMouseDown && kakao.maps.event.removeListener(polyline, "mousedown", props.onMouseDown);
      props.onMouseMove && kakao.maps.event.removeListener(polyline, "mousemove", props.onMouseMove);
      props.onMouseOut && kakao.maps.event.removeListener(polyline, "mouseout", props.onMouseOut);
      props.onMouseOver && kakao.maps.event.removeListener(polyline, "mouseover", props.onMouseOver);
    };
  }, []);

  React.useEffect(() => {
    const path = props.path.map((position) => {
      return new kakao.maps.LatLng(position.lat, position.lng);
    });

    polyline.setPath(path);
  }, [props.path]);

  React.useEffect(() => {
    props.strokeWeight !== undefined ? polyline.setOptions({ strokeWeight: props.strokeWeight }) : null;
  }, [props.strokeWeight]);

  React.useEffect(() => {
    props.strokeColor !== undefined ? polyline.setOptions({ strokeColor: props.strokeColor }) : null;
  }, [props.strokeColor]);

  React.useEffect(() => {
    props.strokeOpacity !== undefined ? polyline.setOptions({ strokeOpacity: props.strokeOpacity }) : null;
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    props.strokeStyle !== undefined ? polyline.setOptions({ strokeStyle: props.strokeStyle }) : null;
  }, [props.strokeStyle]);

  React.useEffect(() => {
    props.zIndex !== undefined ? polyline.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  return (
    <PolylineContext.Provider value={{ polyline }}>
      {props.children}
    </PolylineContext.Provider>
  );
};

export default (() => Polyline)();
