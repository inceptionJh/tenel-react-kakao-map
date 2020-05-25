import * as React from "react";

import { IKakaoRectangle } from "tenel-kakao-map";

const RectangleContext = React.createContext(null as any as { rectangle: IKakaoRectangle })

export default RectangleContext;
