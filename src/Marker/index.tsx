import { IKakao, IKakaoMarker, IKakaoMarkerImageOptions, IKakaoMarkerImage, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import MarkerContext from "./context";

import _hooks from "./hooks";
import MapContext from "../Map/context";

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
  /** 불투명도 ( 0 ~ 1 ) */
  opacity?: number;
  zIndex?: number;
  /** 단위 : m */
  range?: number;
  /** 단위 : m */
  altitude?: number;
  image?: IKakaoMapsMarkerImage | null;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onRightClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
  onDragStart?: (e: { position: { lat: number, lng: number } }) => void;
  onDragEnd?: (e: { position: { lat: number, lng: number } }) => void;
}

function Marker(props: React.PropsWithChildren<IKakaoMapsMarkerProps>) {
  const { map } = React.useContext(MapContext);

  const marker = React.useMemo<IKakaoMarker>(() => {
    const $marker = new kakao.maps.Marker();
    return $marker;
  }, []);

  React.useEffect(() => {
    marker.setMap(map);
    return () => marker.setMap(null);
  }, []);

  const listeners = React.useRef<{ [listener: string]: (...args: any[]) => void }>({});

  listeners.current.onClick = function onClick() {
    props.onClick?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  listeners.current.onRightClick = function onRightClick() {
    props.onRightClick?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  listeners.current.onMouseOver = function onMouseOver(e: IKakaoMouseEvent) {
    props.onMouseOver?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  listeners.current.onMouseOut = function onMouseOut(e: IKakaoMouseEvent) {
    props.onMouseOut?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  listeners.current.onDragStart = function onDragStart() {
    props.onDragStart?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  listeners.current.onDragEnd = function onDragEnd() {
    props.onDragEnd?.({
      position: {
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng(),
      },
    });
  }

  React.useEffect(() => {
    kakao.maps.event.addListener(marker, "click", listeners.current.onClick);
    kakao.maps.event.addListener(marker, "rightclick", listeners.current.onRightClick);
    kakao.maps.event.addListener(marker, "mouseover", listeners.current.onMouseOver);
    kakao.maps.event.addListener(marker, "mouseout", listeners.current.onMouseOut);
    kakao.maps.event.addListener(marker, "dragstart", listeners.current.onDragStart);
    kakao.maps.event.addListener(marker, "dragend", listeners.current.onDragEnd);

    return () => {
      kakao.maps.event.removeListener(marker, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(marker, "rightclick", listeners.current.onRightClick);
      kakao.maps.event.removeListener(marker, "mouseover", listeners.current.onMouseOver);
      kakao.maps.event.removeListener(marker, "mouseout", listeners.current.onMouseOut);
      kakao.maps.event.removeListener(marker, "dragstart", listeners.current.onDragStart);
      kakao.maps.event.removeListener(marker, "dragend", listeners.current.onDragEnd);
    };
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.position.lat, props.position.lng);
    marker.setPosition(latlng);
  }, [props.position.lat, props.position.lng]);

  React.useEffect(() => {
    marker.setClickable(props.clickable!);
  }, [props.clickable]);

  React.useEffect(() => {
    marker.setDraggable(props.draggable!);
  }, [props.draggable]);

  React.useEffect(() => {
    marker.setVisible(props.visible!);
  }, [props.visible]);

  React.useEffect(() => {
    marker.setTitle(props.title ?? "");
  }, [props.title]);

  React.useEffect(() => {
    marker.setOpacity(props.opacity!);
  }, [props.opacity]);

  React.useEffect(() => {
    marker.setRange(props.range!);
  }, [props.range]);

  React.useEffect(() => {
    marker.setAltitude(props.altitude!);
  }, [props.altitude]);

  React.useEffect(() => {
    marker.setZIndex(props.zIndex!);
  }, [props.zIndex]);

  React.useEffect(() => {
    if (!props.image) return marker.setImage(null as any);

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
    const $markerImage = new kakao.maps.MarkerImage(props.image.src, size, options);

    marker.setImage($markerImage);
  }, [props.image, props.image?.src, props.image?.size.width, props.image?.size.height]);

  return (
    <MarkerContext.Provider value={{ marker }}>
      {props.children}
    </MarkerContext.Provider >
  );
}

Marker.defaultProps = {
  opacity: 1,
  visible: true,
  range: 500,
  zIndex: 0,
  altitude: 2,
  clickable: true,
  draggable: false,
};

Marker.propTypes = {
  /** 맵에 표시될 좌표 */
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  /** 기본 마커 대신 사용할 이미지 */
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    options: PropTypes.shape({
      alt: PropTypes.string,
      coords: PropTypes.string,
      shape: PropTypes.string,
      offset: PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired }),
      spriteOrigin: PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired }),
      spriteSize: PropTypes.shape({ width: PropTypes.number.isRequired, height: PropTypes.number.isRequired }),
    }).isRequired,
  }),
  /** 툴팁 */
  title: PropTypes.string,
  /** 불투명도 ( 0 ~ 1 ) */
  opacity: PropTypes.number,
  /** 드래그 가능 여부 */
  draggable: PropTypes.bool,
  /** 클릭 가능 여부 */
  clickable: PropTypes.bool,
  /** 노출 여부 */
  visible: PropTypes.bool,
  /** z-index 속성 값 */
  zIndex: PropTypes.number,
  /** 표시될 최대 거리 ( 로드맵 only ) */
  range: PropTypes.number,
  /** 고도 ( 로드맵 only ) */
  altitude: PropTypes.number,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onClick: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onRightClick: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onDragStart: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onDragEnd: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseOver: PropTypes.func,
  /** (e: { position: { lat: number, lng: number } }) => void */
  onMouseOut: PropTypes.func,
};

export default Marker;
