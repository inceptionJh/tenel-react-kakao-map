import { IKakaoPolyline } from "tenel-kakao-map";

import * as React from "react";

const PolylineContext = React.createContext(null as any as { polyline: IKakaoPolyline });

export default PolylineContext;
