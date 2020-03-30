import React, { useState } from "react";

import KakaoMaps from "../_lib";

export default {
  title: "DrawingManager",
  component: KakaoMaps.DrawingManager,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();

  const [shape, setShape] = React.useState("none");

  const onDrawend = (shape) => {
    console.log(shape);
    setShape("none");
  };

  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setShape((prev) => prev === "none" ? "polygon" : "none")}>toggle</button>
      <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
        {container ? (
          <KakaoMaps.Map
            container={container}
            center={{ lat: 33.450701, lng: 126.570667 }}
            onZoomChange={(e) => {
              console.log(e.zoomLevel);
              setCount((prev) => prev + 1);
            }}
          >
            <KakaoMaps.DrawingManager
              shape={shape}
              onDrawend={(shape) => onDrawend(shape)}
            />
          </KakaoMaps.Map>
        )
          : <span>로드중...</span>
        }
      </div >
    </div>
  );
};
