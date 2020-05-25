import { IKakaoCircle } from "tenel-kakao-map";

import * as React from "react";

const CircleContext = React.createContext(null as any as { circle: IKakaoCircle });

export default CircleContext;
