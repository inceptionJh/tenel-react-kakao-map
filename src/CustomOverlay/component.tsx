import { IKakao, IKakaoCustomOverlay } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import CustomOverlayContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsCustomOverlayProps {
  className?: string;
  content: HTMLElement;
  clickable?: boolean;
  position: { lat: number, lng: number };
  xAnchor?: number;
  yAnchor?: number;
  zIndex?: number;
  altitude?: number;
  range?: number;
}

const CustomOverlay: React.FunctionComponent<IKakaoMapsCustomOverlayProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [customOverlay] = React.useState<IKakaoCustomOverlay>(() => {
    return new kakao.maps.CustomOverlay({ clickable: props.clickable });
  });

  React.useEffect(() => {
    customOverlay.setMap(mapCtx.map);
    return () => customOverlay.setMap(null);
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.position.lat, props.position.lng);
    customOverlay.setPosition(latlng);
  }, [props.position]);

  React.useEffect(() => {
    props.content !== undefined ? customOverlay.setContent(props.content) : null;
  }, [props.content]);

  React.useEffect(() => {
    props.zIndex !== undefined ? customOverlay.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  React.useEffect(() => {
    props.altitude !== undefined ? customOverlay.setAltitude(props.altitude) : null;
  }, [props.altitude]);

  React.useEffect(() => {
    props.range !== undefined ? customOverlay.setRange(props.range) : null;
  }, [props.range]);

  return (
    <CustomOverlayContext.Provider value={{ customOverlay }}>
      {props.children}
    </CustomOverlayContext.Provider>
  );
};

export default (() => CustomOverlay)();
