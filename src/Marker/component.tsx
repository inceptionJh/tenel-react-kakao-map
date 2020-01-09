import { IKakao, IKakaoMarker, IKakaoMarkerImageOptions, IKakaoMarkerImage, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import MarkerContext from "./context";
import KakaoMapContext from "../Map/context";

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
  onClick?: (e: IKakaoMouseEvent) => void;
  onDragStart?: (e: IKakaoMouseEvent) => void;
  onDragEnd?: (e: IKakaoMouseEvent) => void;
  onMouseOut?: (e: IKakaoMouseEvent) => void;
  onMouseOver?: (e: IKakaoMouseEvent) => void;
  onRightClick?: () => void;
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

  React.useEffect(() => {
    marker.setMap(mapCtx.map);
    return () => marker.setMap(null);
  }, []);

  React.useEffect(() => {
    props.onClick && kakao.maps.event.addListener(marker, "click", props.onClick);
    props.onMouseOut && kakao.maps.event.addListener(marker, "mouseout", props.onMouseOut);
    props.onMouseOver && kakao.maps.event.addListener(marker, "mouseover", props.onMouseOver);
    props.onRightClick && kakao.maps.event.addListener(marker, "rightclick", props.onRightClick);
    props.onDragEnd && kakao.maps.event.addListener(marker, "dragend", props.onDragEnd);
    props.onDragStart && kakao.maps.event.addListener(marker, "dragstart", props.onDragStart);

    return () => {
      props.onClick && kakao.maps.event.removeListener(marker, "click", props.onClick);
      props.onDragEnd && kakao.maps.event.removeListener(marker, "dragend", props.onDragEnd);
      props.onDragStart && kakao.maps.event.removeListener(marker, "dragstart", props.onDragStart);
      props.onMouseOut && kakao.maps.event.removeListener(marker, "mouseout", props.onMouseOut);
      props.onMouseOver && kakao.maps.event.removeListener(marker, "mouseover", props.onMouseOver);
      props.onRightClick && kakao.maps.event.removeListener(marker, "rightclick", props.onRightClick);
    };
  }, []);

  React.useEffect(() => {
    props.clickable !== undefined ? marker.setClickable(props.clickable) : null;
  }, [props.clickable]);

  React.useEffect(() => {
    props.draggable !== undefined ? marker.setDraggable(props.draggable) : null;
  }, [props.draggable]);

  React.useEffect(() => {
    props.title !== undefined ? marker.setTitle(props.title) : null;
  }, [props.title]);

  React.useEffect(() => {
    props.opacity !== undefined ? marker.setOpacity(props.opacity) : null;
  }, [props.opacity]);

  React.useEffect(() => {
    props.range !== undefined ? marker.setRange(props.range) : null;
  }, [props.range]);

  React.useEffect(() => {
    props.visible !== undefined ? marker.setVisible(props.visible) : null;
  }, [props.visible]);

  React.useEffect(() => {
    props.zIndex !== undefined ? marker.setZIndex(props.zIndex) : null;
  }, [props.zIndex]);

  React.useEffect(() => {
    props.altitude !== undefined ? marker.setAltitude(props.altitude) : null;
  }, [props.altitude]);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.position.lat, props.position.lng);
    marker.setPosition(latlng);
  }, [props.position, props.position.lat, props.position.lng]);

  React.useEffect(() => {
    markerImage !== null ? marker?.setImage(markerImage) : null;
  }, [markerImage]);

  return (
    <MarkerContext.Provider value={{ marker }}>
      {props.children}
    </MarkerContext.Provider>
  );
};

export default (() => Marker)();
