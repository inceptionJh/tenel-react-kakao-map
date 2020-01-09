import { IKakao, TKakaoStrokeStyles, IKakaoPolygon, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import PolygonContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsPolygonProps {
  className?: string;
  path: { lat: number, lng: number }[][];
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

const Polygon: React.FunctionComponent<IKakaoMapsPolygonProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [polygon] = React.useState<IKakaoPolygon>(() => {
    return new kakao.maps.Polygon();
  });

  React.useEffect(() => {
    polygon.setMap(mapCtx.map);
    return () => polygon.setMap(null);
  }, []);

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(polygon, "click", props.onClick);
    props.onMouseDown && kakao.maps.event.addListener(polygon, "mousedown", props.onMouseDown);
    props.onMouseMove && kakao.maps.event.addListener(polygon, "mousemove", props.onMouseMove);
    props.onMouseOut && kakao.maps.event.addListener(polygon, "mouseout", props.onMouseOut);
    props.onMouseOver && kakao.maps.event.addListener(polygon, "mouseover", props.onMouseOver);

    return () => {
      props.onClick && kakao.maps.event.removeListener(polygon, "click", props.onClick);
      props.onMouseDown && kakao.maps.event.removeListener(polygon, "mousedown", props.onMouseDown);
      props.onMouseMove && kakao.maps.event.removeListener(polygon, "mousemove", props.onMouseMove);
      props.onMouseOut && kakao.maps.event.removeListener(polygon, "mouseout", props.onMouseOut);
      props.onMouseOver && kakao.maps.event.removeListener(polygon, "mouseover", props.onMouseOver);
    };
  }, []);

  React.useEffect(() => {
    const path = props.path.map((positions) => {
      return positions.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng);
      });
    });
    polygon.setPath(path);
  }, [props.path]);

  React.useEffect(() => {
    props.fillColor !== undefined ? polygon.setOptions({ fillColor: props.fillColor }) : null;
  }, [props.fillColor]);

  React.useEffect(() => {
    props.fillOpacity !== undefined ? polygon.setOptions({ fillOpacity: props.fillOpacity }) : null;
  }, [props.fillOpacity]);

  React.useEffect(() => {
    props.strokeWeight !== undefined ? polygon.setOptions({ strokeWeight: props.strokeWeight }) : null;
  }, [props.strokeWeight]);

  React.useEffect(() => {
    props.strokeColor !== undefined ? polygon.setOptions({ strokeColor: props.strokeColor }) : null;
  }, [props.strokeColor]);

  React.useEffect(() => {
    props.strokeOpacity !== undefined ? polygon.setOptions({ strokeOpacity: props.strokeOpacity }) : null;
  }, [props.strokeOpacity]);

  React.useEffect(() => {
    props.strokeStyle !== undefined ? polygon.setOptions({ strokeStyle: props.strokeStyle }) : null;
  }, [props.strokeStyle]);

  React.useEffect(() => {
    props.zIndex !== undefined ? polygon.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  return (
    <PolygonContext.Provider value={{ polygon }}>
      {props.children}
    </PolygonContext.Provider>
  );
};

export default (() => Polygon)();
