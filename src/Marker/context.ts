import * as React from "react";

import { IKakaoMarker } from "tenel-kakao-map";

const MarkerContext = React.createContext(null as any as { marker: IKakaoMarker });

export default MarkerContext;
