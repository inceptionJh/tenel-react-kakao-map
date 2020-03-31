import { IKakao, IKakaoCopyrightPosition, TKakaoOverayMapTypeIdKey, TKakaoBaseMapTypeIdKey } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import KakaoMapContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsMapProps {
  container: HTMLElement;
  center: { lat: number, lng: number };
  baseMapType?: TKakaoBaseMapTypeIdKey;
  overlayMapTypes?: TKakaoOverayMapTypeIdKey[];
  cursor?: string;
  draggable?: boolean;
  zoomable?: boolean;
  drawing?: boolean;
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
  onBoundsChanged?: () => void;
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

const KakaoMap: React.FunctionComponent<IKakaoMapsMapProps> = (props) => {
  const [map] = React.useState(() => {
    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    const options = { center: latlng };
    return new kakao.maps.Map(props.container, options);
  });

  _hooks.useCenter(map, props.center);
  _hooks.useDrag(map, props.draggable!);
  _hooks.useCursor(map, props.cursor);
  _hooks.useBounds(map, props.bounds!);
  _hooks.useCopyright(map, props.copyright!);
  _hooks.useBaseMapTypes(map, props.baseMapType!);
  _hooks.useOverlayMapTypes(map, props.overlayMapTypes!);

  _hooks.useZoom(map, props.zoomable!, props.minLevel!, props.maxLevel!, props.level!, props.levelDuration!);
  _hooks.useZoomStartEvent(map, props.onZoomStart!);
  _hooks.useZoomChangedEvent(map, props.onZoomChange!);

  _hooks.useDragEvent(map, props.onDrag!);
  _hooks.useDragStartEvent(map, props.onDragStart!);
  _hooks.useDragEndEvent(map, props.onDragEnd!);
  _hooks.useClickEvent(map, props.drawing!, props.onClick!);
  _hooks.useDoubleClickEvent(map, props.onDoubleClick!);
  _hooks.useRightClickEvent(map, props.onRightClick!);
  _hooks.useIdleEvent(map, props.onIdle!);

  React.useEffect(() => {
    props.onTilesLoaded && kakao.maps.event.addListener(map, "tilesloaded", props.onTilesLoaded);
    props.onBoundsChanged && kakao.maps.event.addListener(map, "bounds_changed", props.onBoundsChanged);

    const zoomLevel = props.level!;
    const position = { lat: props.center.lat, lng: props.center.lng };
    const bounds = [
      { lat: map.getBounds().getSouthWest().getLat(), lng: map.getBounds().getSouthWest().getLng() },
      { lat: map.getBounds().getNorthEast().getLat(), lng: map.getBounds().getNorthEast().getLng() },
    ] as [{ lat: number, lng: number }, { lat: number, lng: number }];
    const e = { zoomLevel, position, bounds };
    props.onIdle!(e);

    return () => {
      props.onTilesLoaded && kakao.maps.event.removeListener(map, "tilesloaded", props.onTilesLoaded);
      props.onBoundsChanged && kakao.maps.event.removeListener(map, "bounds_changed", props.onBoundsChanged);
    };
  }, []);

  return (
    <KakaoMapContext.Provider value={{ map }}>
      {props.children}
    </KakaoMapContext.Provider>
  );
};

KakaoMap.defaultProps = {
  zoomable: true,
  draggable: true,
  drawing: false,
  copyright: { position: "BOTTOMLEFT", reverse: false },
  level: 3,
  minLevel: 1,
  maxLevel: 14,
  levelDuration: 300,
  baseMapType: "ROADMAP",
  overlayMapTypes: [],
  onDrag() { },
  onDragEnd() { },
  onDragStart() { },
  onMouseMove() { },
  onClick() { },
  onDoubleClick() { },
  onRightClick() { },
  onZoomStart() { },
  onZoomChange() { },
  onIdle() { },
};

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

KakaoMap.propTypes = {
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

export default KakaoMap;
