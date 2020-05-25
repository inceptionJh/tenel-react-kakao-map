import { IKakaoMap } from "tenel-kakao-map";

import * as React from "react";

const MapContext = React.createContext(null as any as { map: IKakaoMap });

export default MapContext;
