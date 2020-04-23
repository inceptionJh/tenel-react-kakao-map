import React from "react";

import { number, boolean } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default {
  title: "CustomOverlay",
  component: KakaoMaps.CustomOverlay,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();
  const content = React.useMemo(() => document.createElement("div"), []);

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.CustomOverlay
            position={{ lat: number("position.latitude", 33.450701), lng: number("position.longitude", 126.570667) }}
            clickable={boolean("clickable", true)}
            xAnchor={0.5}
            yAnchor={0.5}
            zIndex={number("zIndex", 1)}
            altitude={number("altitude", 2)}
            range={number("range", 500)}
            content={content}
          >
            <div style={{ padding: 10, background: "rgba(127,127,255)", color: "#fff" }}>test</div>
          </KakaoMaps.CustomOverlay>
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};
