import React from "react";

import { number, color, select } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default { title: "Circle" };

export const basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Circle
            center={{ lat: number("center.latitude", 33.450701), lng: number("center.longitude", 126.570667) }}
            fillColor={color("fillColor", "#fa7")}
            fillOpacity={number("fillOpacity", 0.2, { min: 0, max: 1, range: true, step: 0.01 })}
            radius={number("radius", 50) || 0}
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
