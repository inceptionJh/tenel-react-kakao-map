import React, { useState } from "react";
import ReactDOMServer from "react-dom/server"

import { number, boolean } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default { title: "CustomOverlay" };

const content = document.createElement("div");
content.textContent = "custom overlay";
content.style = `
  width: 150px;
  height: 30px;

  text-align: center;
  line-height: 30px;

  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px 0 #000;
`;

export const basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 700, height: 700 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          center={{ lat: 33.450701, lng: 126.570667 }}
        >
          <KakaoMaps.CustomOverlay
            position={{ lat: number("position.latitude", 33.450701), lng: number("position.longitude", 126.570667) }}
            clickable={boolean("clickable", true)}
            xAnchor={number("xAnchor", 0.5, { min: 0, max: 1, range: true, step: 0.01 })}
            yAnchor={number("yAnchor", 0.5, { min: 0, max: 1, range: true, step: 0.01 })}
            zIndex={number("zIndex", 0)}
            altitude={number("altitude", 2)}
            range={number("range", 500)}
            content={content}
          />
        </KakaoMaps.Map>
      )
        : <span>로드중...</span>
      }
    </div >
  );
};

// TODO