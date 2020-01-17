import { IKakao, IKakaoCustomOverlay } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "../Map/context";
import CustomOverlayContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsCustomOverlayProps {
  className?: string;
  position: { lat: number, lng: number };
  content: HTMLElement | string;
  clickable?: boolean;
  xAnchor?: number;
  yAnchor?: number;
  zIndex?: number;
  altitude?: number;
  range?: number;
}

const CustomOverlay: React.FunctionComponent<IKakaoMapsCustomOverlayProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [customOverlay] = React.useState<IKakaoCustomOverlay>(() => {
    return new kakao.maps.CustomOverlay({ clickable: props.clickable, xAnchor: props.xAnchor, yAnchor: props.yAnchor });
  });

  _hooks.useInit(customOverlay, mapCtx.map);
  _hooks.usePosition(customOverlay, props.position);
  _hooks.useContent(customOverlay, props.content);
  _hooks.useZIndex(customOverlay, props.zIndex!);
  _hooks.useRange(customOverlay, props.range!);
  _hooks.useAltitude(customOverlay, props.altitude!);

  return (
    <CustomOverlayContext.Provider value={{ customOverlay }}>
      {props.children}
    </CustomOverlayContext.Provider>
  );
};

CustomOverlay.defaultProps = {
  clickable: true,
  xAnchor: 0.5,
  yAnchor: 0.5,
  zIndex: 0,
  altitude: 2,
  range: 500,
};

export default (() => CustomOverlay)();
