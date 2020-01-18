import React from "react";

import { number, text, boolean } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

import react from "./react.png";

export default { title: "Marker" };

export const basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Marker
            position={{ lat: number("position.latitude", 33.450701), lng: number("position.longitude", 126.570667) }}
            title={text("title", "마커")}
            draggable={boolean("draggable", false)}
            clickable={boolean("clickable", true)}
            opacity={number("opacity", 1, { min: 0, max: 1, range: true, step: 0.01 })}
            visible={boolean("visible", true)}
            range={number("range", 500)}
            zIndex={number("zIndex", 0)}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};

export const image = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.Marker
            position={{ lat: number("position.latitude", 33.450701), lng: number("position.longitude", 126.570667) }}
            image={{
              src: react,
              size: { width: number("image.size.width", 50), height: number("image.size.height", 50) },
              options: { alt: text("image.options.alt", "-") }
            }}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};
