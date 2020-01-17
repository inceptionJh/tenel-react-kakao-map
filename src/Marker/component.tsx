import { IKakao, IKakaoMarker, IKakaoMarkerImageOptions, IKakaoMarkerImage } from "tenel-kakao-map";

import * as React from "react";

import MarkerContext from "./context";
import KakaoMapContext from "../Map/context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsMarkerImage {
  src: string;
  size: {
    width: number,
    height: number,
  };
  options: {
    alt?: string,
    coords?: string,
    shape?: string,
    offset?: { x: number, y: number },
    spriteOrigin?: { x: number, y: number },
    spriteSize?: { width: number, height: number },
  };
}

export interface IKakaoMapsMarkerProps {
  className?: string;
  position: { lat: number, lng: number };
  title?: string;
  clickable?: boolean;
  draggable?: boolean;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  range?: number;
  altitude?: number;
  image?: IKakaoMapsMarkerImage;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onRightClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
  onDragStart?: (e: { position: { lat: number, lng: number } }) => void;
  onDragEnd?: (e: { position: { lat: number, lng: number } }) => void;
}

const Marker: React.FunctionComponent<IKakaoMapsMarkerProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [marker] = React.useState<IKakaoMarker>(() => {
    return new kakao.maps.Marker();
  });

  const [markerImage] = React.useState<IKakaoMarkerImage | null>(() => {
    if (props.image) {
      const size = new kakao.maps.Size(props.image.size.width, props.image.size.height);

      const offset = props.image.options.offset ? new kakao.maps.Point(props.image.options.offset.x, props.image.options.offset.y) : undefined;
      const spriteOrigin = props.image.options.spriteOrigin ? new kakao.maps.Point(props.image.options.spriteOrigin.x, props.image.options.spriteOrigin.y) : undefined;
      const spriteSize = props.image.options.spriteSize ? new kakao.maps.Size(props.image.options.spriteSize.width, props.image.options.spriteSize.height) : undefined;

      const options: IKakaoMarkerImageOptions = {
        ...props.image.options,
        offset,
        spriteOrigin,
        spriteSize,
      };
      return new kakao.maps.MarkerImage(props.image.src, size, options);
    }

    return null;
  });

  _hooks.useInit(marker, mapCtx.map);
  _hooks.usePosition(marker, props.position);
  _hooks.useClickable(marker, props.clickable!);
  _hooks.useDraggable(marker, props.draggable!);
  _hooks.useVisible(marker, props.visible!);
  _hooks.useTitle(marker, props.title!);
  _hooks.useOpacity(marker, props.opacity!);
  _hooks.useRange(marker, props.range!);
  _hooks.useAltitude(marker, props.range!);
  _hooks.useZIndex(marker, props.zIndex!);
  _hooks.useMarkerImage(marker, markerImage!);

  return (
    <MarkerContext.Provider value={{ marker }}>
      {props.children}
    </MarkerContext.Provider>
  );
};

Marker.defaultProps = {
  opacity: 1,
  visible: true,
  range: 500,
  zIndex: 0,
  altitude: 2,
  clickable: true,
  draggable: false,
  onClick: () => undefined,
  onDragEnd: () => undefined,
  onMouseOut: () => undefined,
  onMouseOver: () => undefined,
  onRightClick: () => undefined,
  onDragStart: () => undefined,
};

export default (() => Marker)();
