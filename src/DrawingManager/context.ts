import { IKakaoDrawingManager } from "tenel-kakao-map";

import * as React from "react";

const DrawingManagerContext = React.createContext(null as any as { drawingManager: IKakaoDrawingManager })

export default DrawingManagerContext;
