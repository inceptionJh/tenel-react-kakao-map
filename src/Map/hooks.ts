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
  useZoom,
  useCursor,
  useCopyright,
  useBounds,
  useOverlayMapTypes,
};
