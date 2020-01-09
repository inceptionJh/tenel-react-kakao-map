import { IKakao, IKakaoMouseEvent, IKakaoCopyrightPosition } from "tenel-kakao-map";

import * as React from "react";

import KakaoMapContext from "./context";

import _hooks from "./hooks";

declare var kakao: IKakao;

export interface IKakaoMapsMapProps {
  container: HTMLElement;
  center: { lat: number, lng: number };
  overlayMapTypes?: (keyof typeof kakao.maps.MapTypeId)[];
  cursor?: string;
  draggable?: boolean;
  zoomable?: boolean;
  level?: {
    value: number,
    min?: number;
    max?: number;
    options?: { animate: { duration: number } },
  };
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
  onTilesLoaded?: () => void;
  onIdle?: () => void;
  onBoundsChanged?: () => void;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onRightClick?: (e: { position: { lat: number, lng: number } }) => void;
  onDoubleClick?: (e: { position: { lat: number, lng: number } }) => void;
  onDrag?: (e: { position: { lat: number, lng: number } }) => void;
  onDragEnd?: (e: { position: { lat: number, lng: number } }) => void;
  onDragStart?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseMove?: (e: { position: { lat: number, lng: number } }) => void;
}

const KakaoMap: React.FunctionComponent<IKakaoMapsMapProps> = (props) => {
  const [map] = React.useState(() => {
    const latlng = new kakao.maps.LatLng(props.center.lat, props.center.lng);
    const options = { center: latlng };
    return new kakao.maps.Map(props.container, options);
  });

  React.useEffect(() => {
    props.onTilesLoaded && kakao.maps.event.addListener(map, "tilesloaded", props.onTilesLoaded);
    props.onIdle && kakao.maps.event.addListener(map, "idle", props.onIdle);
    props.onBoundsChanged && kakao.maps.event.addListener(map, "bounds_changed", props.onBoundsChanged);

    return () => {
      props.onTilesLoaded && kakao.maps.event.removeListener(map, "tilesloaded", props.onTilesLoaded);
      props.onIdle && kakao.maps.event.removeListener(map, "idle", props.onIdle);
      props.onBoundsChanged && kakao.maps.event.removeListener(map, "bounds_changed", props.onBoundsChanged);
    };
  }, []);

  _hooks.useCenter(map, props.center);
  _hooks.useDrag(map, props.draggable!);
  _hooks.useCursor(map, props.cursor);
  _hooks.useBounds(map, props.bounds!);
  _hooks.useCopyright(map, props.copyright!);
  _hooks.useOverlayMapTypes(map, props.overlayMapTypes!);

  _hooks.useZoom(map, props.zoomable!, props.level!.min!, props.level!.max!, props.level!.value!, props.level!.options!.animate.duration!);
  _hooks.useZoomStartEvent(map, props.onZoomStart!);
  _hooks.useZoomChangedEvent(map, props.onZoomChange!);

  _hooks.useDragEvent(map, props.onDrag!);
  _hooks.useDragStartEvent(map, props.onDragStart!);
  _hooks.useDragEndEvent(map, props.onDragEnd!);
  _hooks.useClickEvent(map, props.onClick!);
  _hooks.useDoubleClickEvent(map, props.onDoubleClick!);
  _hooks.useRightClickEvent(map, props.onRightClick!);

  return (
    <KakaoMapContext.Provider value={{ map }}>
      {props.children}
    </KakaoMapContext.Provider>
  );
};

KakaoMap.defaultProps = {
  zoomable: true,
  draggable: true,
  copyright: { position: "BOTTOMLEFT", reverse: false },
  level: {
    value: 3,
    min: 1,
    max: 14,
    options: { animate: { duration: 300 } },
  },
  overlayMapTypes: [],
  onDrag: () => undefined,
  onDragEnd: () => undefined,
  onDragStart: () => undefined,
  onMouseMove: () => undefined,
  onClick: () => undefined,
  onDoubleClick: () => undefined,
  onRightClick: () => undefined,
  onZoomStart: () => undefined,
  onZoomChange: () => undefined,
};

export default (() => KakaoMap)();
