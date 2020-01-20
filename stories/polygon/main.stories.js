import React from "react";

import { number, color, select, object } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default {
  title: "Polygon",
  component: KakaoMaps.Polygon,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Polygon
            path={object("path", [
              { lat: 33.450701 + 0.001, lng: 126.570667 },
              { lat: 33.450701 - 0.001, lng: 126.570667 - 0.001 },
              { lat: 33.450701 - 0.001, lng: 126.570667 + 0.001 },
            ])}
            fillColor={color("fillColor", "#fa7")}
            fillOpacity={number("fillOpacity", 0.2, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeColor={color("strokeColor", "#fa7")}
            strokeOpacity={number("strokeOpacity", 1, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeWeight={number("strokeWeight", 2)}
            strokeStyle={select("strokeStyle", ["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"], "solid")}
            zIndex={0}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};

export const Perforated = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Polygon
            path={object("path", [
              [
                { lat: 33.450701 + 0.001, lng: 126.570667 },
                { lat: 33.450701 - 0.001, lng: 126.570667 - 0.001 },
                { lat: 33.450701 - 0.001, lng: 126.570667 + 0.001 },
              ],
              [
                { lat: 33.450701 + 0.0005, lng: 126.570667 },
                { lat: 33.450701 - 0.0008, lng: 126.570667 - 0.0006 },
                { lat: 33.450701 - 0.0008, lng: 126.570667 + 0.0006 },
              ],
            ])}
            fillColor={color("fillColor", "#fa7")}
            fillOpacity={number("fillOpacity", 0.2, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeColor={color("strokeColor", "#fa7")}
            strokeOpacity={number("strokeOpacity", 1, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeWeight={number("strokeWeight", 2)}
            strokeStyle={select("strokeStyle", ["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"], "solid")}
            zIndex={0}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};
