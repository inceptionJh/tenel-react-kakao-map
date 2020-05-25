import { IKakaoEllipse } from "tenel-kakao-map";

import * as React from "react";

const EllipseContext = React.createContext(null as any as { ellipse: IKakaoEllipse });

export default EllipseContext;
