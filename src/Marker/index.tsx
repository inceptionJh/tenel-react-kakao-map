import { IKakao, IKakaoMarker, IKakaoMarkerImageOptions, IKakaoMarkerImage, IKakaoMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import MarkerContext from "./context";
import KakaoMapContext from "../Map/context";

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
  image?: IKakaoMapsMarkerImage;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onRightClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
  onDragStart?: (e: { position: { lat: number, lng: number } }) => void;
  onDragEnd?: (e: { position: { lat: number, lng: number } }) => void;
}

class Marker extends React.Component<IKakaoMapsMarkerProps> {
  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  private marker: IKakaoMarker;
  private markerImage: IKakaoMarkerImage | null;

  public static defaultProps = {
    opacity: 1,
    visible: true,
    range: 500,
    zIndex: 0,
    altitude: 2,
    clickable: true,
    draggable: false,
  };

  public static propTypes = {
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

  constructor(props: IKakaoMapsMarkerProps) {
    super(props);

    this.marker = new kakao.maps.Marker();

    kakao.maps.event.addListener(this.marker, "click", this.onClick);
    kakao.maps.event.addListener(this.marker, "rightclick", this.onRightClick);
    kakao.maps.event.addListener(this.marker, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.marker, "mouseout", this.onMouseOut);
    kakao.maps.event.addListener(this.marker, "dragstart", this.onDragStart);
    kakao.maps.event.addListener(this.marker, "dragend", this.onDragEnd);

    this.markerImage = null;

    if (this.props.image) {
      const size = new kakao.maps.Size(this.props.image.size.width, this.props.image.size.height);

      const offset = this.props.image.options.offset ? new kakao.maps.Point(this.props.image.options.offset.x, this.props.image.options.offset.y) : undefined;
      const spriteOrigin = this.props.image.options.spriteOrigin ? new kakao.maps.Point(this.props.image.options.spriteOrigin.x, this.props.image.options.spriteOrigin.y) : undefined;
      const spriteSize = this.props.image.options.spriteSize ? new kakao.maps.Size(this.props.image.options.spriteSize.width, this.props.image.options.spriteSize.height) : undefined;

      const options: IKakaoMarkerImageOptions = {
        ...this.props.image.options,
        offset,
        spriteOrigin,
        spriteSize,
      };
      this.markerImage = new kakao.maps.MarkerImage(this.props.image.src, size, options);
    }
  }

  public componentDidMount() {
    this.marker.setMap(this.context.map);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.marker, "click", this.onClick);
    kakao.maps.event.removeListener(this.marker, "rightclick", this.onRightClick);
    kakao.maps.event.removeListener(this.marker, "mouseover", this.onMouseOver);
    kakao.maps.event.removeListener(this.marker, "mouseout", this.onMouseOut);
    kakao.maps.event.removeListener(this.marker, "dragstart", this.onDragStart);
    kakao.maps.event.removeListener(this.marker, "dragend", this.onDragEnd);

    this.marker.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsMarkerProps) {
    if (nextProps.position.lat !== this.props.position.lat || nextProps.position.lng !== this.props.position.lng) {
      const latlng = new kakao.maps.LatLng(nextProps.position.lat, nextProps.position.lng);
      this.marker.setPosition(latlng);
    }

    if (nextProps.clickable !== this.props.clickable) {
      this.marker.setClickable(nextProps.clickable!);
    }

    if (nextProps.draggable !== this.props.draggable) {
      this.marker.setDraggable(nextProps.draggable!);
    }

    if (nextProps.visible !== this.props.visible) {
      this.marker.setVisible(nextProps.visible!);
    }

    if (nextProps.title !== this.props.title) {
      this.marker.setTitle(nextProps.title!);
    }

    if (nextProps.opacity !== this.props.opacity) {
      this.marker.setOpacity(nextProps.opacity!);
    }

    if (nextProps.range !== this.props.range) {
      this.marker.setRange(nextProps.range!);
    }

    if (nextProps.altitude !== this.props.altitude) {
      this.marker.setAltitude(nextProps.altitude!);
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.marker.setZIndex(nextProps.zIndex!);
    }

    if (nextProps.image !== this.props.image) {
      this.marker.setImage(nextProps.image!);
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.marker.setZIndex(nextProps.zIndex!);
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.marker.setZIndex(nextProps.zIndex!);
    }
  }

  public render() {
    return (
      <MarkerContext.Provider value={{ marker: this.marker }}>
        {this.props.children}
      </MarkerContext.Provider >
    );
  }

  private onClick = (e: IKakaoMouseEvent) => {
    this.props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onRightClick = (e: IKakaoMouseEvent) => {
    this.props.onRightClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onMouseOver = (e: IKakaoMouseEvent) => {
    this.props.onMouseOver?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onMouseOut = (e: IKakaoMouseEvent) => {
    this.props.onMouseOut?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onDragStart = (e: IKakaoMouseEvent) => {
    this.props.onDragStart?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onDragEnd = (e: IKakaoMouseEvent) => {
    this.props.onDragEnd?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }
};

export default Marker;
