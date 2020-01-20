import React from "react";

import { number, optionsKnob, radios } from "@storybook/addon-knobs";

import KakaoMaps from "../_lib";

export default {
  title: "Map",
  component: KakaoMaps.Map,
};

export const Basic = () => {
  const [container, setContainer] = React.useState();

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 600, height: 400 }}>
      {container ? (
        <KakaoMaps.Map
          container={container}
          baseMapType={radios("baseMapType", ["ROADMAP", "SKYVIEW", "HYBRID"], "ROADMAP")}
          overlayMapTypes={optionsKnob("overlayMapTypes", { overlay: "OVERLAY", roadview: "ROADVIEW", traffic: "TRAFFIC", terrain: "TERRAIN", bicycle: "BICYCLE", bicycleHybrid: "BICYCLE_HYBRID", useDistrict: "USE_DISTRICT" }, [], { display: "multi-select" })}
          center={{ lat: number("center.latitude", 33.450701), lng: number("center.longitude", 126.570667) }}
        />
      )
        : <span>로드중...</span>
      }
    </div>
  );
};
