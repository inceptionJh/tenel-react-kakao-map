import { IKakaoMarker, IKakao, IKakaoMarkerImage } from "tenel-kakao-map";

import * as React from "react";

const useMarkerImage = (marker: IKakaoMarker, markerImage: IKakaoMarkerImage) => {
  React.useEffect(() => {
    markerImage && marker.setImage(markerImage);
  }, [markerImage]);
};
export default {
  useMarkerImage,
};
