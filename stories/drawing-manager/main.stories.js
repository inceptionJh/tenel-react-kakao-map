import React from "react";

import KakaoMaps from "../_lib";

export default {
  title: "DrawingManager",
  component: KakaoMaps.DrawingManager,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();

  const [draw, setDraw] = React.useState(false);

  return (
    <div>
      <button onClick={() => setDraw((prev) => !prev)}>toggle</button>
      <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
        {container ? (
          <KakaoMaps.Map
            container={container}
            center={{ lat: 33.450701, lng: 126.570667 }}
          >
            <KakaoMaps.DrawingManager
              shape={draw ? "polygon" : "none"}
              onDrawend={(e) => {
                setDraw(false);
              }}
            />
          </KakaoMaps.Map>
        )
          : <span>로드중...</span>
        }
      </div >
    </div>
  );
};
