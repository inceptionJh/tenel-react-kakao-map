import React from "react";

import { number, color, select, array } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default { title: "Polygon" };

export const basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Polygon
            path={array("path", [
              { lat: 33.450701, lng: 126.570667 },
              { lat: 33.450701 + 0.002, lng: 126.570667 },
              { lat: 33.450701 + 0.002, lng: 126.570667 + 0.002 },
            ])}
            fillColor={color("fillColor", "#fa7")}
            fillOpacity={number("fillOpacity", 0.2, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeColor={color("strokeColor", "#fa7")}
            strokeOpacity={number("strokeOpacity", 0.8, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeWeight={number("strokeWeight", 2)}
            strokeStyle={select("strokeStyle", ["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"], "dot")}
            zIndex={0}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};

export const perforated = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Polygon
            path={array("path", [
              [
                { lat: 33.450701, lng: 126.570667 },
                { lat: 33.450701 + 0.002, lng: 126.570667 },
                { lat: 33.450701 + 0.002, lng: 126.570667 + 0.002 },
              ],
              [
                { lat: 33.450701, lng: 126.570667 },
                { lat: 33.450701 + 0.0005, lng: 126.570667 },
                { lat: 33.450701 + 0.0005, lng: 126.570667 + 0.0005 },
              ],
            ])}
            fillColor={color("fillColor", "#fa7")}
            fillOpacity={number("fillOpacity", 0.2, { min: 0, max: 1, range: true, step: 0.01 })}
            strokeColor={color("strokeColor", "#fa7")}
            strokeOpacity={number("strokeOpacity", 0.8, { min: 0, max: 1, range: true, step: 0.01 })}
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
