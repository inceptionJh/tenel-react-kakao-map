import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "./context";

import type { IKakao, IKakaoCopyrightPosition, TKakaoOverayMapTypeIdKey, TKakaoBaseMapTypeIdKey, IKakaoMapOptions, IKakaoMap, IKakaoMouseEvent } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsMapRef {
  map: IKakaoMap;
}

export interface IKakaoMapsMapProps {
  container?: HTMLElement;
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
  onTilesLoaded?: (e: {
    zoomLevel: number,
    position: { lat: number, lng: number },
    bounds: [
      { lat: number, lng: number },
      { lat: number, lng: number },
    ],
  }) => void;
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

const KakaoMap = React.forwardRef<IKakaoMapsMapRef, React.PropsWithChildren<IKakaoMapsMapProps>>((props, ref) => {
  const listeners = React.useRef<{ [listener: string]: (...args: any[]) => void }>({});

  listeners.current.onClick = function onClick(e: IKakaoMouseEvent) {
    props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onDoubleClick = function onDoubleClick(e: IKakaoMouseEvent) {
    props.onDoubleClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onRightClick = function onRightClick(e: IKakaoMouseEvent) {
    props.onRightClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onMouseMove = function onMouseMove(e: IKakaoMouseEvent) {
    props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  listeners.current.onDrag = function onDrag() {
    props.onDrag?.({
      position: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    });
  }

  listeners.current.onDragStart = function onDragStart() {
    props.onDragStart?.({
      position: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    });
  }

  listeners.current.onDragEnd = function onDragEnd() {
    props.onDragEnd?.({
      position: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    });
  }

  listeners.current.onZoomStart = function onZoomStart() {
    props.onZoomStart?.({ zoomLevel: map.getLevel() });
  }

  listeners.current.onZoomChange = function onZoomChange() {
    props.onZoomChange?.({ zoomLevel: map.getLevel() });
  }

  listeners.current.onIdle = function onIdle() {
    props.onIdle?.({
      zoomLevel: map.getLevel(),
      position: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      bounds: [
        { lat: map.getBounds().getSouthWest().getLat(), lng: map.getBounds().getSouthWest().getLng() },
        { lat: map.getBounds().getNorthEast().getLat(), lng: map.getBounds().getNorthEast().getLng() },
      ],
    });
  }

  listeners.current.onBoundsChanged = function onBoundsChanged() {
    props.onBoundsChanged?.({
      bounds: [
        { lat: map.getBounds().getSouthWest().getLat(), lng: map.getBounds().getSouthWest().getLng() },
        { lat: map.getBounds().getNorthEast().getLat(), lng: map.getBounds().getNorthEast().getLng() },
      ],
    });
  }

  listeners.current.onTilesLoaded = function onTilesLoaded() {
    props.onTilesLoaded?.({
      zoomLevel: map.getLevel(),
      position: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      bounds: [
        { lat: map.getBounds().getSouthWest().getLat(), lng: map.getBounds().getSouthWest().getLng() },
        { lat: map.getBounds().getNorthEast().getLat(), lng: map.getBounds().getNorthEast().getLng() },
      ],
    });
  }
  const [map, mapEl] = React.useMemo<[IKakaoMap, HTMLDivElement]>(() => {
    const $mapEl = document.createElement("div");
    $mapEl.style.width = "100%";
    $mapEl.style.height = "100%";

    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    const options: IKakaoMapOptions = {
      center: latlng,
      level: props.level,
    };
    const $map = new kakao.maps.Map($mapEl, options);

    $map.setZoomable(props.zoomable!);
    $map.setDraggable(props.draggable!);
    $map.setMaxLevel(props.maxLevel!);
    $map.setMinLevel(props.minLevel!);
    $map.setMapTypeId(kakao.maps.MapTypeId[props.baseMapType!]);
    $map.setCopyrightPosition(kakao.maps.CopyrightPosition[props.copyright!.position], props.copyright!.reverse);

    if (props.cursor) {
      $map.setCursor(props.cursor);
    }

    if (props.bounds) {
      const sw = new kakao.maps.LatLng(props.bounds.value[0].lat, props.bounds.value[0].lng);
      const ne = new kakao.maps.LatLng(props.bounds.value[1].lat, props.bounds.value[1].lng);
      const kakaoBounds = new kakao.maps.LatLngBounds(sw, ne);
      $map.setBounds(kakaoBounds, props.bounds.paddingTop, props.bounds.paddingRight, props.bounds.paddingBottom, props.bounds.paddingLeft);
    }

    kakao.maps.event.addListener($map, "click", listeners.current.onClick);
    kakao.maps.event.addListener($map, "dblclick" as any, listeners.current.onDoubleClick);
    kakao.maps.event.addListener($map, "rightclick", listeners.current.onRightClick);
    kakao.maps.event.addListener($map, "mousemove", listeners.current.onMouseMove);
    kakao.maps.event.addListener($map, "drag", listeners.current.onDrag);
    kakao.maps.event.addListener($map, "dragstart", listeners.current.onDragStart);
    kakao.maps.event.addListener($map, "dragend", listeners.current.onDragEnd);
    kakao.maps.event.addListener($map, "zoom_start", listeners.current.onZoomStart);
    kakao.maps.event.addListener($map, "zoom_changed", listeners.current.onZoomChange);
    kakao.maps.event.addListener($map, "idle", listeners.current.onIdle);
    kakao.maps.event.addListener($map, "bounds_changed", listeners.current.onBoundsChanged);
    kakao.maps.event.addListener($map, "tilesloaded", listeners.current.onTilesLoaded);

    return [$map, $mapEl];
  }, []);

  React.useEffect(() => {
    if (!props.container) return;

    props.container.appendChild(mapEl);
    map.relayout();
  }, [props.container]);

  React.useEffect(() => {
    return () => {
      kakao.maps.event.removeListener(map, "click", listeners.current.onClick);
      kakao.maps.event.removeListener(map, "dblclick" as any, listeners.current.onDoubleClick);
      kakao.maps.event.removeListener(map, "rightclick", listeners.current.onRightClick);
      kakao.maps.event.removeListener(map, "mousemove", listeners.current.onMouseMove);
      kakao.maps.event.removeListener(map, "drag", listeners.current.onDrag);
      kakao.maps.event.removeListener(map, "dragstart", listeners.current.onDragStart);
      kakao.maps.event.removeListener(map, "dragend", listeners.current.onDragEnd);
      kakao.maps.event.removeListener(map, "zoom_start", listeners.current.onZoomStart);
      kakao.maps.event.removeListener(map, "zoom_changed", listeners.current.onZoomChange);
      kakao.maps.event.removeListener(map, "idle", listeners.current.onIdle);
      kakao.maps.event.removeListener(map, "bounds_changed", listeners.current.onBoundsChanged);
      kakao.maps.event.removeListener(map, "tilesloaded", listeners.current.onTilesLoaded);
    }
  }, []);

  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    map.setCenter(latlng);
  }, [props.center.lat, props.center.lng]);

  React.useEffect(() => {
    map.setDraggable(props.draggable!);
  }, [props.draggable]);

  React.useEffect(() => {
    if (props.cursor) map.setCursor(props.cursor);
  }, [props.cursor]);

  React.useEffect(() => {
    if (!props.bounds) return;
    const sw = new kakao.maps.LatLng(props.bounds.value[0].lat, props.bounds.value[0].lng);
    const ne = new kakao.maps.LatLng(props.bounds.value[1].lat, props.bounds.value[1].lng);
    const kakaoBounds = new kakao.maps.LatLngBounds(sw, ne);
    map.setBounds(kakaoBounds, props.bounds.paddingTop, props.bounds.paddingRight, props.bounds.paddingBottom, props.bounds.paddingLeft);
  }, [props.bounds?.value.flat(Infinity).join(), props.bounds?.paddingTop, props.bounds?.paddingRight, props.bounds?.paddingBottom, props.bounds?.paddingLeft]);

  React.useEffect(() => {
    map.setMapTypeId(kakao.maps.MapTypeId[props.baseMapType!]);
  }, [props.baseMapType]);

  React.useEffect(() => {
    // tslint:disable-next-line: forin
    for (const type in kakao.maps.MapTypeId) {
      map.removeOverlayMapTypeId(kakao.maps.MapTypeId[type as TKakaoOverayMapTypeIdKey]);
    }
    props.overlayMapTypes?.forEach((type) => {
      map.addOverlayMapTypeId(kakao.maps.MapTypeId[type]);
    });
  }, [props.overlayMapTypes]);

  React.useEffect(() => {
    map.setCopyrightPosition(kakao.maps.CopyrightPosition[props.copyright!.position], props.copyright!.reverse);
  }, [props.copyright?.reverse, props.copyright?.position]);

  React.useEffect(() => {
    map.setZoomable(props.zoomable!);
  }, [props.zoomable]);

  React.useEffect(() => {
    if (props.level! > props.maxLevel!) {
      map.setLevel(props.maxLevel!);
      kakao.maps.event.trigger(map, "idle", {});
    }
    map.setMaxLevel(props.maxLevel!);
  }, [props.maxLevel]);

  React.useEffect(() => {
    if (props.level! < props.minLevel!) {
      map.setLevel(props.minLevel!);
      kakao.maps.event.trigger(map, "idle", {});
    }
    map.setMinLevel(props.minLevel!);
  }, [props.minLevel]);

  React.useEffect(() => {
    const options = {
      anchor: undefined,
      animate: props.levelDuration ? { duration: props.levelDuration } : undefined
    };
    map.setLevel(props.level!, options);
  }, [props.levelDuration, props.level]);

  React.useImperativeHandle(ref, () => {
    return { map };
  });

  const [mount, setMount] = React.useState(false);

  React.useEffect(() => setMount(true), []);

  return (
    <KakaoMapContext.Provider value={{ map }}>
      {mount && props.children}
    </KakaoMapContext.Provider>
  );
})

KakaoMap.defaultProps = {
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

KakaoMap.propTypes = {
  /** 지도가 표시될 HTML element */
  container: PropTypes.instanceOf(HTMLElement),
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
  baseMapType: PropTypes.oneOf(["ROADMAP", "SKYVIEW", "HYBRID"] as const),
  /** 지도에 오버레이할 타입을 설정 */
  overlayMapTypes: PropTypes.arrayOf(PropTypes.oneOf(["OVERLAY", "ROADVIEW", "TRAFFIC", "TERRAIN", "BICYCLE", "BICYCLE_HYBRID", "USE_DISTRICT"] as const).isRequired),
  /** 확대/축소 가능 여부 */
  zoomable: PropTypes.bool,
  /** 드래그 가능 여부 */
  draggable: PropTypes.bool,
  /** Copyright 위치 및 반전 */
  // copyright: React.Validator<{
  //   position: keyof IKakaoCopyrightPosition;
  //   reverse?: boolean | undefined;
  // } | null | undefined> | undefined,
  copyright: PropTypes.shape({
    position: PropTypes.oneOf<"BOTTOMLEFT" | "BOTTOMRIGHT">(["BOTTOMLEFT", "BOTTOMRIGHT"]).isRequired,
    reverse: PropTypes.bool,
  }) as React.Validator<{ position: keyof IKakaoCopyrightPosition; reverse?: boolean; }>,
  /** 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정 */
  bounds: PropTypes.shape({
    value: PropTypes.arrayOf(Position).isRequired,
    paddingTop: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
  }) as React.Validator<{
    value: [{ lat: number, lng: number }, { lat: number, lng: number }];
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  }>,
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

export default KakaoMap;
