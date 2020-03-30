import { IKakaoDrawingManager, IKakaoDrawingMouseEvent, TKakaoStrokeStyles, TKakaoDrawingOverayTypeValue } from "tenel-kakao-map";

import * as React from "react";

export const useDrawShape = (drawingManager: IKakaoDrawingManager, shape: TKakaoDrawingOverayTypeValue | "none") => {
  React.useEffect(() => {
    if (shape === "none") return drawingManager.cancel();

    drawingManager.select(shape);
  }, [shape]);
};

export const useSetShapeStyle = (
  drawingManager: IKakaoDrawingManager,
  shape: TKakaoDrawingOverayTypeValue | "none",
  style: {
    stroke: string,
    strokeStyle: TKakaoStrokeStyles,
    strokeWidth: number,
    strokeOpacity: number,
    fill: string,
    fillOpacity: number,
    hintStrokeStyle: TKakaoStrokeStyles,
    hintStrokeOpacity: number,
  },
) => {
  React.useEffect(() => {
    if (shape === "none") return;
    drawingManager.setStyle(shape, "strokeColor", style.stroke);
    drawingManager.setStyle(shape, "strokeWeight", style.strokeWidth);
    drawingManager.setStyle(shape, "strokeOpacity", style.strokeOpacity);
    drawingManager.setStyle(shape, "hintStrokeStyle", style.strokeStyle);
    drawingManager.setStyle(shape, "fillColor", style.fill);
    drawingManager.setStyle(shape, "fillOpacity", style.fillOpacity);
  }, [shape]);
};

export const useDrawendEvent = (
  drawingManager: IKakaoDrawingManager,
  callback: (shape: any) => void,
) => {
  const _ = React.useMemo(() => ({ callback: (() => { }) as any }), []);

  React.useEffect(() => {
    try {
      drawingManager.removeListener("drawend", _.callback);
    } catch (error) { }
  }, [callback]);

  React.useEffect(() => {
    _.callback = (mouseEvent: IKakaoDrawingMouseEvent) => {
      const data = drawingManager.getData();
      drawingManager.remove(mouseEvent.target);
      callback(data[mouseEvent.overlayType][0]);
    };;
  }, [callback]);

  React.useEffect(() => {
    drawingManager.addListener("drawend", _.callback);
    return () => drawingManager.removeListener("drawend", _.callback);
  }, [callback]);
};
