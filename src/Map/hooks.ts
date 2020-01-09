import { IKakao, IKakaoMap, IKakaoCopyrightPosition } from "tenel-kakao-map";

import * as React from "react";

declare var kakao: IKakao;

const useCenter = (map: IKakaoMap, center: { lat: number, lng: number }) => {
  React.useEffect(() => {
    const latlng = new kakao.maps.LatLng(center.lat, center.lng);
    map.setCenter(latlng);
  }, [center]);
};

const useDrag = (map: IKakaoMap, draggable: boolean) => {
  React.useEffect(() => {
    map.setDraggable(draggable);
  }, [draggable]);
};

const useMouseMoveEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onMouseMove = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "mousemove", onMouseMove);

    return () => kakao.maps.event.removeListener(map, "mousemove", onMouseMove);
  }, []);
};

const useClickEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onClick = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "click", onClick);

    return () => kakao.maps.event.removeListener(map, "click", onClick);
  }, []);
};

const useDoubleClickEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onDoubleClick = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "dbclick", onDoubleClick);

    return () => kakao.maps.event.removeListener(map, "dbclick", onDoubleClick);
  }, []);
};

const useRightClickEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onRightClick = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "rightclick", onRightClick);

    return () => kakao.maps.event.removeListener(map, "rightclick", onRightClick);
  }, []);
};

const useDragStartEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onDragStart = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "dragstart", onDragStart);

    return () => kakao.maps.event.removeListener(map, "dragstart", onDragStart);
  }, []);
};

const useDragEndEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onDragEnd = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "dragend", onDragEnd);

    return () => kakao.maps.event.removeListener(map, "dragend", onDragEnd);
  }, []);
};

const useDragEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  React.useEffect(() => {
    const onDrag = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
    kakao.maps.event.addListener(map, "drag", onDrag);

    return () => kakao.maps.event.removeListener(map, "drag", onDrag);
  }, []);
};

const useZoomStartEvent = (
  map: IKakaoMap,
  callback: (e: { zoomLevel: number }) => void,
) => {
  React.useEffect(() => {
    const onDrag = () => {
      const zoomLevel = map.getLevel();
      const e = { zoomLevel };
      callback(e);
    };
    kakao.maps.event.addListener(map, "zoom_start", onDrag);

    return () => kakao.maps.event.removeListener(map, "zoom_start", onDrag);
  }, []);
};

const useZoomChangedEvent = (
  map: IKakaoMap,
  callback: (e: { zoomLevel: number }) => void,
) => {
  React.useEffect(() => {
    const onDrag = () => {
      const zoomLevel = map.getLevel();
      const e = { zoomLevel };
      callback(e);
    };
    kakao.maps.event.addListener(map, "zoom_changed", onDrag);

    return () => kakao.maps.event.removeListener(map, "zoom_changed", onDrag);
  }, []);
};

const useZoom = (map: IKakaoMap, zoomable: boolean, min: number, max: number, value: number, duration: number) => {
  React.useEffect(() => {
    map.setZoomable(zoomable);
  }, [zoomable]);

  React.useEffect(() => {
    map.setMaxLevel(max);
  }, [max]);

  React.useEffect(() => {
    map.setMinLevel(min);
  }, [min]);

  React.useEffect(() => {
    const animation = { duration };
    const anchor = undefined;
    const options = { animation, anchor };
    map.setLevel(value, options);
  }, [value, duration]);
};

const useCursor = (map: IKakaoMap, cursor?: string) => {
  React.useEffect(() => {
    if (cursor) {
      map.setCursor(cursor);
    }
  }, [cursor]);
};

const useCopyright = (map: IKakaoMap, copyright: { position: keyof IKakaoCopyrightPosition, reverse?: boolean }) => {
  React.useEffect(() => {
    map.setCopyrightPosition(kakao.maps.CopyrightPosition[copyright.position], copyright.reverse);
  }, [copyright]);
};

const useBounds = (
  map: IKakaoMap,
  bounds?: {
    value: [{ lat: number, lng: number }, { lat: number, lng: number }],
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  },
) => {
  React.useEffect(() => {
    if (bounds) {
      const sw = new kakao.maps.LatLng(bounds.value[0].lat, bounds.value[0].lng);
      const ne = new kakao.maps.LatLng(bounds.value[1].lat, bounds.value[1].lng);
      const kakaoBounds = new kakao.maps.LatLngBounds(sw, ne);
      map.setBounds(kakaoBounds, bounds.paddingTop, bounds.paddingRight, bounds.paddingBottom, bounds.paddingLeft);
    }
  }, [bounds]);
};

const useOverlayMapTypes = (map: IKakaoMap, overlayMapTypes: (keyof typeof kakao.maps.MapTypeId)[]) => {
  const [_overlayMapTypes, _setOverlayMapTypes] = React.useState(overlayMapTypes);

  React.useEffect(() => {
    overlayMapTypes.forEach((currType) => map.addOverlayMapTypeId(kakao.maps.MapTypeId[currType]));
  }, []);

  React.useEffect(() => {
    _overlayMapTypes.forEach((prevType) => {
      if (!(overlayMapTypes.includes(prevType))) {
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId[prevType]);
      }
    });

    overlayMapTypes.forEach((currType) => {
      if (!(overlayMapTypes!.includes(currType))) {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId[currType]);
      }
    });

    _setOverlayMapTypes(overlayMapTypes);
  }, [overlayMapTypes]);
};

export default {
  useCenter,
  useDrag,
  useClickEvent,
  useDoubleClickEvent,
  useRightClickEvent,
  useMouseMoveEvent,
  useDragStartEvent,
  useDragEvent,
  useDragEndEvent,
  useZoomStartEvent,
  useZoomChangedEvent,
  useZoom,
  useCursor,
  useCopyright,
  useBounds,
  useOverlayMapTypes,
};
