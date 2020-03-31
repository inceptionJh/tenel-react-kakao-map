import { IKakao, IKakaoMap, IKakaoCopyrightPosition, IKakaoMouseEvent, TKakaoOverayMapTypeIdKey, TKakaoBaseMapTypeIdKey } from "tenel-kakao-map";

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
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "mousemove", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = (event: IKakaoMouseEvent) => {
      const lat = event.latLng.getLat();
      const lng = event.latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "mousemove", _.callback);
    return () => kakao.maps.event.removeListener(map, "mousemove", _.callback);
  }, [callback]);
};

const useClickEvent = (
  map: IKakaoMap,
  drawing: boolean,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    if (drawing) return;
    kakao.maps.event.removeListener(map, "click", _.callback);
  }, [_.callback]);

  React.useEffect(() => {
    if (drawing) return;
    _.callback = (event: IKakaoMouseEvent) => {
      const lat = event.latLng.getLat();
      const lng = event.latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    if (!drawing) kakao.maps.event.addListener(map, "click", _.callback);
    return () => kakao.maps.event.removeListener(map, "click", _.callback);
  }, [_.callback]);
};

const useDoubleClickEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "dbclick", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = (event: IKakaoMouseEvent) => {
      const lat = event.latLng.getLat();
      const lng = event.latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "dbclick", _.callback);
    return () => kakao.maps.event.removeListener(map, "dbclick", _.callback);
  }, [callback]);
};

const useRightClickEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "rightclick", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = (event: IKakaoMouseEvent) => {
      const lat = event.latLng.getLat();
      const lng = event.latLng.getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "rightclick", _.callback);
    return () => kakao.maps.event.removeListener(map, "rightclick", _.callback);
  }, [callback]);
};

const useDragStartEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "dragstart", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const lat = map.getCenter().getLat();
      const lng = map.getCenter().getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "dragstart", _.callback);
    return () => kakao.maps.event.removeListener(map, "dragstart", _.callback);
  }, [callback]);
};

const useDragEndEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "dragend", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const lat = map.getCenter().getLat();
      const lng = map.getCenter().getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "dragend", _.callback);
    return () => kakao.maps.event.removeListener(map, "dragend", _.callback);
  }, [callback]);
};

const useDragEvent = (
  map: IKakaoMap,
  callback: (e: { position: { lat: number, lng: number } }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "drag", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const lat = map.getCenter().getLat();
      const lng = map.getCenter().getLng();
      const position = { lat, lng };
      const e = { position };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "drag", _.callback);
    return () => kakao.maps.event.removeListener(map, "drag", _.callback);
  }, [callback]);
};

const useZoomStartEvent = (
  map: IKakaoMap,
  callback: (e: { zoomLevel: number }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "zoom_start", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const zoomLevel = map.getLevel();
      const e = { zoomLevel };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "zoom_start", _.callback);
    return () => kakao.maps.event.removeListener(map, "zoom_start", _.callback);
  }, [callback]);
};

const useZoomChangedEvent = (
  map: IKakaoMap,
  callback: (e: { zoomLevel: number }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "zoom_changed", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const zoomLevel = map.getLevel();
      const e = { zoomLevel };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "zoom_changed", _.callback);
    return () => kakao.maps.event.removeListener(map, "zoom_changed", _.callback);
  }, [callback]);
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

const useBaseMapTypes = (map: IKakaoMap, baseMapType: TKakaoBaseMapTypeIdKey) => {
  React.useEffect(() => {
    map.setMapTypeId(kakao.maps.MapTypeId[baseMapType]);
  }, [baseMapType]);
};

const useOverlayMapTypes = (map: IKakaoMap, overlayMapTypes: TKakaoOverayMapTypeIdKey[]) => {
  const [prevOverlayMapTypes, setPrevOverlayMapTypes] = React.useState(overlayMapTypes);

  React.useEffect(() => {
    overlayMapTypes.forEach((currType) => map.addOverlayMapTypeId(kakao.maps.MapTypeId[currType]));
  }, []);

  React.useEffect(() => {
    prevOverlayMapTypes.forEach((prevType) => {
      if (!(overlayMapTypes.includes(prevType))) {
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId[prevType]);
      }
    });

    overlayMapTypes.forEach((currType) => {
      if (!(prevOverlayMapTypes.includes(currType))) {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId[currType]);
      }
    });

    setPrevOverlayMapTypes(overlayMapTypes);
  }, [overlayMapTypes]);
};

const useIdleEvent = (
  map: IKakaoMap,
  callback: (e: {
    zoomLevel: number,
    position: { lat: number, lng: number },
    bounds: [{ lat: number, lng: number }, { lat: number, lng: number }],
  }) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    kakao.maps.event.removeListener(map, "idle", _.callback);
  }, [callback]);

  React.useEffect(() => {
    _.callback = () => {
      const latlng = map.getCenter();
      const lat = latlng.getLat();
      const lng = latlng.getLng();
      const position = { lat, lng };

      const kakaoBounds = map.getBounds();
      const ne = kakaoBounds.getNorthEast();
      const neLat = ne.getLat();
      const neLng = ne.getLng();

      const sw = kakaoBounds.getSouthWest();
      const swLat = sw.getLat();
      const swLng = sw.getLng();

      const bounds = [{ lat: swLat, lng: swLng }, { lat: neLat, lng: neLng }] as [{ lat: number, lng: number }, { lat: number, lng: number }];

      const zoomLevel = map.getLevel();

      const e = { zoomLevel, position, bounds };
      callback(e);
    };
  }, [callback]);

  React.useEffect(() => {
    kakao.maps.event.addListener(map, "idle", _.callback);
    return () => kakao.maps.event.removeListener(map, "idle", _.callback);
  }, [callback]);
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
  useBaseMapTypes,
  useOverlayMapTypes,
  useIdleEvent,
};
