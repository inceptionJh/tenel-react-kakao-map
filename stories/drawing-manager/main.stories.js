import React from "react";

import KakaoMaps from "../_lib";

export default {
  title: "DrawingManager",
  component: KakaoMaps.DrawingManager,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();

  const [shape, setShape] = React.useState("none");

  const onDrawend = () => {
    setShape("none");
  };

  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button
        style={{ width: 100, height: 50, margin: 20, border: "none", borderRadius: 2, color: "#333", backgroundColor: "#fff", fontWeight: "bold", overflow: "hidden", boxShadow: "0 0 2px 0 #000" }}
        onClick={() => setShape((prev) => prev === "none" ? "circle" : "none")}
      >
        {shape}
      </button>

      <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
        {container ? (
          <KakaoMaps.Map
            container={container}
            drawing={shape !== "none"}
            center={{ lat: 33.450701, lng: 126.570667 }}
            onClick={() => {
              setCount((prev) => prev + 1);
              console.log(`count : ${count + 1}`);
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
