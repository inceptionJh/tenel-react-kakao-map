import { IKakao, IKakaoMarker, IKakaoMarkerImageOptions, IKakaoMarkerImage } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

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
  /** 불투명도 ( 0 ~ 1 ) */
  opacity?: number;
  zIndex?: number;
  /** 단위 : m */
  range?: number;
  /** 단위 : m */
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

  _hooks.useClickEvent(marker, props.onClick!);
  _hooks.useRightClickEvent(marker, props.onRightClick!);
  _hooks.useMouseOverEvent(marker, props.onMouseOver!);
  _hooks.useMouseOutEvent(marker, props.onMouseOut!);
  _hooks.useDragStartEvent(marker, props.onDragStart!);
  _hooks.useDragEndEvent(marker, props.onDragEnd!);

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
  onClick: function () { },
  onRightClick: function () { },
  onDragStart: function () { },
  onDragEnd: function () { },
  onMouseOut: function () { },
  onMouseOver: function () { },
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
