import { IKakao, TKakaoStrokeStyles, IKakaoEllipse, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import EllipseContext from "./context";

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
  onClick?: (e: IKakaoMouseEvent) => void;
  onMouseDown?: (e: IKakaoMouseEvent) => void;
  onMouseMove?: (e: IKakaoMouseEvent) => void;
  onMouseOut?: (e: IKakaoMouseEvent) => void;
  onMouseOver?: (e: IKakaoMouseEvent) => void;
}

const Ellipse: React.FunctionComponent<IKakaoMapsEllipseProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [ellipse] = React.useState<IKakaoEllipse>(() => {
    return new kakao.maps.Ellipse({ rx: props.rx, ry: props.ry });
  });

  React.useEffect(() => {
    ellipse.setMap(mapCtx.map);
    return () => ellipse.setMap(null);
  }, []);

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(ellipse, "click", props.onClick);
    props.onMouseDown && kakao.maps.event.addListener(ellipse, "mousedown", props.onMouseDown);
    props.onMouseMove && kakao.maps.event.addListener(ellipse, "mousemove", props.onMouseMove);
    props.onMouseOut && kakao.maps.event.addListener(ellipse, "mouseout", props.onMouseOut);
    props.onMouseOver && kakao.maps.event.addListener(ellipse, "mouseover", props.onMouseOver);

    return () => {
      props.onClick && kakao.maps.event.removeListener(ellipse, "click", props.onClick);
      props.onMouseDown && kakao.maps.event.removeListener(ellipse, "mousedown", props.onMouseDown);
      props.onMouseMove && kakao.maps.event.removeListener(ellipse, "mousemove", props.onMouseMove);
      props.onMouseOut && kakao.maps.event.removeListener(ellipse, "mouseout", props.onMouseOut);
      props.onMouseOver && kakao.maps.event.removeListener(ellipse, "mouseover", props.onMouseOver);
    };
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.position.lat, props.position.lng);
    ellipse.setPosition(latlng);
  }, [props.position]);

  React.useEffect(() => {
    ellipse.setRadius(props.rx, props.ry);
  }, [props.rx, props.ry]);

  React.useEffect(() => {
    props.fillColor !== undefined ? ellipse.setOptions({ fillColor: props.fillColor }) : null;
  }, [props.fillColor]);

  React.useEffect(() => {
    props.fillOpacity !== undefined ? ellipse.setOptions({ fillOpacity: props.fillOpacity }) : null;
  }, [props.fillOpacity]);

  React.useEffect(() => {
    props.strokeWeight !== undefined ? ellipse.setOptions({ strokeWeight: props.strokeWeight }) : null;
  }, [props.strokeWeight]);

  React.useEffect(() => {
    props.strokeColor !== undefined ? ellipse.setOptions({ strokeColor: props.strokeColor }) : null;
  }, [props.strokeColor]);

  React.useEffect(() => {
    props.strokeOpacity !== undefined ? ellipse.setOptions({ strokeOpacity: props.strokeOpacity }) : null;
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    props.strokeStyle !== undefined ? ellipse.setOptions({ strokeStyle: props.strokeStyle }) : null;
  }, [props.strokeStyle]);

  React.useEffect(() => {
    props.zIndex !== undefined ? ellipse.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  return (
    <EllipseContext.Provider value={{ ellipse }}>
      {props.children}
    </EllipseContext.Provider>
  );
};

export default (() => Ellipse)();
