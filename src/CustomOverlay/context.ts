import { IKakaoCustomOverlay } from "tenel-kakao-map";

import * as React from "react";

const CustomOverlayContext = React.createContext(null as any as { customOverlay: IKakaoCustomOverlay })

export default CustomOverlayContext;
