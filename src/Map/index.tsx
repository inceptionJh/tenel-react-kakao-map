import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "./context";

import type { IKakao, IKakaoCopyrightPosition, TKakaoOverayMapTypeIdKey, TKakaoBaseMapTypeIdKey, IKakaoMapOptions, IKakaoMap, IKakaoMouseEvent } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsMapProps {
  container: HTMLElement;
  center: { lat: number, lng: number };
  baseMapType?: TKakaoBaseMapTypeIdKey;
  overlayMapTypes?: TKakaoOverayMapTypeIdKey[];
  cursor?: string;
  draggable?: boolean;
  zoomable?: boolean;
  level?: number;
  minLevel?: number;
  maxLevel?: number;
  levelDuration?: number;
  copyright?: {
    position: keyof IKakaoCopyrightPosition;
    reverse?: boolean;
  };
  bounds?: {
    value: [{ lat: number, lng: number }, { lat: number, lng: number }],
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  };
  onZoomStart?: (e: { zoomLevel: number }) => void;
  onZoomChange?: (e: { zoomLevel: number }) => void;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onRightClick?: (e: { position: { lat: number, lng: number } }) => void;
  onDoubleClick?: (e: { position: { lat: number, lng: number } }) => void;
  onDrag?: (e: { position: { lat: number, lng: number } }) => void;
  onDragEnd?: (e: { position: { lat: number, lng: number } }) => void;
  onDragStart?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseMove?: (e: { position: { lat: number, lng: number } }) => void;
  onTilesLoaded?: () => void;
  onBoundsChanged?: (e: {
    bounds: [
      { lat: number, lng: number },
      { lat: number, lng: number },
    ],
  }) => void;
  /** bounds: [sw, ne] */
  onIdle?: (e: {
    zoomLevel: number,
    position: { lat: number, lng: number },
    bounds: [
      { lat: number, lng: number },
      { lat: number, lng: number },
    ],
  }) => void;
}

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

class KakaoMap extends React.Component<IKakaoMapsMapProps> {
  private map: IKakaoMap;

  public static defaultProps = {
    zoomable: true,
    draggable: true,
    copyright: { position: "BOTTOMLEFT", reverse: false },
    level: 3,
    minLevel: 1,
    maxLevel: 14,
    levelDuration: 300,
    baseMapType: "ROADMAP",
    overlayMapTypes: [],
  };

  public static propTypes = {
    /** 지도가 표시될 HTML element */
    container: PropTypes.instanceOf(HTMLElement).isRequired,
    /** 지도의 중심 좌표 */
    center: Position,
    /** 커서 모양 */
    cursor: PropTypes.string,
    /** 최대 확대/축소 수준 */
    maxLevel: PropTypes.number,
    /** 최소 확대/축소 수준 */
    minLevel: PropTypes.number,
    /** 확대/축소 수준 */
    level: PropTypes.number,
    /** 확대/축소 트렌지션 시간 ( 단위 : ms ) */
    levelDuration: PropTypes.number,
    /** 지도의 타입을 설정 */
    baseMapType: PropTypes.oneOf(["ROADMAP", "SKYVIEW", "HYBRID"]),
    /** 지도에 오버레이할 타입을 설정 */
    overlayMapTypes: PropTypes.arrayOf(PropTypes.oneOf(["OVERLAY", "ROADVIEW", "TRAFFIC", "TERRAIN", "BICYCLE", "BICYCLE_HYBRID", "USE_DISTRICT"] as const).isRequired),
    /** 확대/축소 가능 여부 */
    zoomable: PropTypes.bool,
    /** 드래그 가능 여부 */
    draggable: PropTypes.bool,
    /** Copyright 위치 및 반전 */
    copyright: PropTypes.shape({
      position: PropTypes.oneOf(["BOTTOMLEFT", "BOTTOMRIGHT"] as const).isRequired,
      reverse: PropTypes.bool,
    }),
    /** 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정 */
    bounds: PropTypes.shape({
      value: PropTypes.arrayOf(Position).isRequired as PropTypes.Validator<[
        PropTypes.InferProps<{
          lat: PropTypes.Validator<number>;
          lng: PropTypes.Validator<number>;
        }>,
        PropTypes.InferProps<{
          lat: PropTypes.Validator<number>;
          lng: PropTypes.Validator<number>;
        }>
      ]>,
      paddingTop: PropTypes.number,
      paddingRight: PropTypes.number,
      paddingBottom: PropTypes.number,
      paddingLeft: PropTypes.number,
    }),
    /** (e: { position: { lat: number, lng: number } }) => void */
    onClick: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onDoubleClick: PropTypes.func,
    /** () => void */
    onRightClick: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onMouseMove: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onDrag: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onDragStart: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onDragEnd: PropTypes.func,
    /** (e: { zoomLevel: number }) => void */
    onZoomStart: PropTypes.func,
    /** (e: { zoomLevel: number }) => void */
    onZoomChange: PropTypes.func,
    /** (e: { zoomLevel: number, position: { lat: number, lng: number }, bounds: [{lat: number, lng: number}, {lat: number, lng: number}] }) => void */
    onIdle: PropTypes.func,
    /** () => void */
    onBoundsChanged: PropTypes.func,
    /** () => void */
    onTilesLoaded: PropTypes.func,
  };

  constructor(props: IKakaoMapsMapProps) {
    super(props);

    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    const options: IKakaoMapOptions = {
      center: latlng,
      level: props.level,
    };
    this.map = new kakao.maps.Map(props.container, options);

    this.map.setZoomable(this.props.zoomable!);
    this.map.setDraggable(this.props.draggable!);
    this.map.setMaxLevel(this.props.maxLevel!);
    this.map.setMinLevel(this.props.minLevel!);
    this.map.setMapTypeId(kakao.maps.MapTypeId[this.props.baseMapType!]);
    this.map.setCopyrightPosition(kakao.maps.CopyrightPosition[this.props.copyright!.position], this.props.copyright!.reverse);

    if (this.props.cursor) {
      this.map.setCursor(this.props.cursor);
    }

    if (this.props.bounds) {
      const sw = new kakao.maps.LatLng(this.props.bounds.value[0].lat, this.props.bounds.value[0].lng);
      const ne = new kakao.maps.LatLng(this.props.bounds.value[1].lat, this.props.bounds.value[1].lng);
      const kakaoBounds = new kakao.maps.LatLngBounds(sw, ne);
      this.map.setBounds(kakaoBounds, this.props.bounds.paddingTop, this.props.bounds.paddingRight, this.props.bounds.paddingBottom, this.props.bounds.paddingLeft);
    }

    this.props.overlayMapTypes?.forEach((prevType) => this.map.addOverlayMapTypeId(kakao.maps.MapTypeId[prevType]));

    kakao.maps.event.addListener(this.map, "click", this.onClick);
    kakao.maps.event.addListener(this.map, "dbclick", this.onDoubleClick);
    kakao.maps.event.addListener(this.map, "rightclick", this.onRightClick);
    kakao.maps.event.addListener(this.map, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.map, "drag", this.onDrag);
    kakao.maps.event.addListener(this.map, "dragstart", this.onDragStart);
    kakao.maps.event.addListener(this.map, "dragend", this.onDragEnd);
    kakao.maps.event.addListener(this.map, "zoom_start", this.onZoomStart);
    kakao.maps.event.addListener(this.map, "zoom_changed", this.onZoomChange);
    kakao.maps.event.addListener(this.map, "idle", this.onIdle);
    kakao.maps.event.addListener(this.map, "bounds_changed", this.onBoundsChanged);
    kakao.maps.event.addListener(this.map, "tilesloaded", this.onTilesLoaded);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.map, "click", this.onClick);
    kakao.maps.event.removeListener(this.map, "dbclick", this.onDoubleClick);
    kakao.maps.event.removeListener(this.map, "rightclick", this.onRightClick);
    kakao.maps.event.removeListener(this.map, "mousemove", this.onMouseMove);
    kakao.maps.event.removeListener(this.map, "drag", this.onDrag);
    kakao.maps.event.removeListener(this.map, "dragstart", this.onDragStart);
    kakao.maps.event.removeListener(this.map, "dragend", this.onDragEnd);
    kakao.maps.event.removeListener(this.map, "zoom_start", this.onZoomStart);
    kakao.maps.event.removeListener(this.map, "zoom_changed", this.onZoomChange);
    kakao.maps.event.removeListener(this.map, "idle", this.onIdle);
    kakao.maps.event.removeListener(this.map, "bounds_changed", this.onBoundsChanged);
    kakao.maps.event.removeListener(this.map, "tilesloaded", this.onTilesLoaded);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsMapProps) {
    if (nextProps.center.lat !== this.props.center.lat || nextProps.center.lng !== this.props.center.lng) {
      const latlng = new kakao.maps.LatLng(nextProps.center.lat, nextProps.center.lng);
      this.map.setCenter(latlng);
    }

    if (nextProps.draggable !== this.props.draggable) {
      this.map.setDraggable(nextProps.draggable!);
    }

    if (nextProps.cursor !== this.props.cursor) {
      if (nextProps.cursor !== undefined) {
        this.map.setCursor(nextProps.cursor);
      }
    }

    if ([
      nextProps.bounds?.value.flat(Infinity).join() !== this.props.bounds?.value.flat(Infinity).join(),
      nextProps.bounds?.paddingTop !== this.props.bounds?.paddingTop,
      nextProps.bounds?.paddingRight !== this.props.bounds?.paddingRight,
      nextProps.bounds?.paddingBottom !== this.props.bounds?.paddingBottom,
      nextProps.bounds?.paddingLeft !== this.props.bounds?.paddingLeft,
    ].some((v) => v)) {
      if (!nextProps.bounds) return;
      const sw = new kakao.maps.LatLng(nextProps.bounds.value[0].lat, nextProps.bounds.value[0].lng);
      const ne = new kakao.maps.LatLng(nextProps.bounds.value[1].lat, nextProps.bounds.value[1].lng);
      const kakaoBounds = new kakao.maps.LatLngBounds(sw, ne);
      this.map.setBounds(kakaoBounds, nextProps.bounds.paddingTop, nextProps.bounds.paddingRight, nextProps.bounds.paddingBottom, nextProps.bounds.paddingLeft);
    }

    if (nextProps.baseMapType !== this.props.baseMapType) {
      this.map.setMapTypeId(kakao.maps.MapTypeId[nextProps.baseMapType!]);
    }

    if (nextProps.overlayMapTypes?.sort().join() !== this.props.overlayMapTypes?.sort().join()) {
      this.props.overlayMapTypes?.forEach((prevType) => {
        if (!(nextProps.overlayMapTypes?.includes(prevType))) {
          this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId[prevType]);
        }
      });

      nextProps.overlayMapTypes?.forEach((currType) => {
        if (!(this.props.overlayMapTypes?.includes(currType))) {
          this.map.addOverlayMapTypeId(kakao.maps.MapTypeId[currType]);
        }
      });
    }

    if ([
      nextProps.copyright?.reverse !== this.props.copyright?.reverse,
      nextProps.copyright?.position !== this.props.copyright?.position,
    ].some((v) => v)) {
      this.map.setCopyrightPosition(kakao.maps.CopyrightPosition[nextProps.copyright!.position], nextProps.copyright!.reverse);
    }

    if (nextProps.zoomable !== this.props.zoomable) {
      this.map.setZoomable(nextProps.zoomable!);
    }

    if (nextProps.maxLevel !== this.props.maxLevel) {
      this.map.setMaxLevel(nextProps.maxLevel!);
    }

    if (nextProps.minLevel !== this.props.minLevel) {
      this.map.setMinLevel(nextProps.minLevel!);
    }

    if (nextProps.level !== this.props.level) {
      const options = {
        anchor: undefined,
        animate: nextProps.levelDuration ? { duration: nextProps.levelDuration } : undefined
      };
      this.map.setLevel(nextProps.level!, options);
    }

    if (nextProps.maxLevel !== this.props.maxLevel) {
      if (nextProps.level! > nextProps.maxLevel!) {
        this.map.setLevel(nextProps.maxLevel!);
        kakao.maps.event.trigger(this.map, "idle", {});
      }
    }

    if (nextProps.minLevel !== this.props.minLevel) {
      if (nextProps.level! < nextProps.minLevel!) {
        this.map.setLevel(nextProps.minLevel!);
        kakao.maps.event.trigger(this.map, "idle", {});
      }
    }
  }

  public render() {
    return (
      <KakaoMapContext.Provider value={{ map: this.map }}>
        {this.props.children}
      </KakaoMapContext.Provider>
    );
  }

  private onClick = (e: IKakaoMouseEvent) => {
    this.props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  private onDoubleClick = (e: IKakaoMouseEvent) => {
    this.props.onDoubleClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    });
  }

  private onRightClick = (e: IKakaoMouseEvent) => {
    this.props.onRightClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    })
  }

  private onDrag = () => {
    this.props.onDrag?.({
      position: {
        lat: this.map.getCenter().getLat(),
        lng: this.map.getCenter().getLng(),
      }
    })
  }

  private onDragStart = () => {
    this.props.onDragStart?.({
      position: {
        lat: this.map.getCenter().getLat(),
        lng: this.map.getCenter().getLng(),
      }
    })
  }

  private onDragEnd = () => {
    this.props.onDragEnd?.({
      position: {
        lat: this.map.getCenter().getLat(),
        lng: this.map.getCenter().getLng(),
      }
    })
  }

  private onMouseMove = (e: IKakaoMouseEvent) => {
    this.props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }
    });
  }

  private onZoomStart = () => {
    this.props.onZoomStart?.({ zoomLevel: this.map.getLevel() });
  }

  private onZoomChange = () => {
    this.props.onZoomChange?.({ zoomLevel: this.map.getLevel() });
  }

  private onIdle = () => {
    this.props.onIdle?.({
      zoomLevel: this.map.getLevel(),
      position: {
        lat: this.map.getCenter().getLat(),
        lng: this.map.getCenter().getLng(),
      },
      bounds: [
        { lat: this.map.getBounds().getSouthWest().getLat(), lng: this.map.getBounds().getSouthWest().getLng() },
        { lat: this.map.getBounds().getNorthEast().getLat(), lng: this.map.getBounds().getNorthEast().getLng() },
      ],
    });
  }

  private onBoundsChanged = () => {
    this.props.onBoundsChanged?.({
      bounds: [
        { lat: this.map.getBounds().getSouthWest().getLat(), lng: this.map.getBounds().getSouthWest().getLng() },
        { lat: this.map.getBounds().getNorthEast().getLat(), lng: this.map.getBounds().getNorthEast().getLng() },
      ],
    });
  }

  private onTilesLoaded = () => {
    this.props.onTilesLoaded?.();
  }
};

export default KakaoMap;
