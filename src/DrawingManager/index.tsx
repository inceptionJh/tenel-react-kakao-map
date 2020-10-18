import { IKakao, IKakaoDrawingManager, IDrawingManagerOptions, TKakaoStrokeStyles, TKakaoDrawingOverayTypeValue, IKakaoDrawingMouseEvent } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import DrawingManagerContext from "./context";
import MapContext from "../Map/context";

declare var kakao: IKakao;

export interface IKakaoMapsDrawingManagerProps {
  className?: string;
  shape?: TKakaoDrawingOverayTypeValue | "none";
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeStyle?: TKakaoStrokeStyles;
  strokeWidth?: number;
  strokeOpacity?: number;
  hintStrokeStyle?: TKakaoStrokeStyles;
  hintStrokeOpacity?: number;
  onDrawend: (shape: any) => void;
}

function DrawingManager(props: React.PropsWithChildren<IKakaoMapsDrawingManagerProps>) {
  const { map } = React.useContext(MapContext);

  const drawingManager = React.useMemo<IKakaoDrawingManager>(() => {
    const options: IDrawingManagerOptions = {
      map,
      drawingMode: ["arrow", "circle", "ellipse", "marker", "polygon", "polyline", "rectangle"],
    };
    const $drawingManager = new kakao.maps.drawing.DrawingManager(options);

    return $drawingManager;
  }, []);

  const listeners = React.useRef<{ [listener: string]: (...args: any[]) => void }>({});

  listeners.current.onDrawend = function onDrawend(mouseEvent: IKakaoDrawingMouseEvent) {
    const data = drawingManager.getData();
    drawingManager.remove(mouseEvent.target);
    props.onDrawend?.(data[mouseEvent.overlayType][0]);

    if (props.shape === "none") {
      drawingManager.cancel();
    }

    if (props.shape !== "none") {
      drawingManager.select(props.shape!);
    }
  }

  React.useEffect(() => {
    drawingManager.addListener("drawend", listeners.current.onDrawend);
    return () => {
      drawingManager.removeListener("drawend", listeners.current.onDrawend);
    };
  }, []);

  React.useLayoutEffect(() => {
    props.shape === "none"
      ? drawingManager.cancel()
      : drawingManager.select(props.shape!);
  }, [props.shape]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "fillColor", props.fill!)
  }, [props.shape, props.fill]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "fillOpacity", props.fillOpacity!)
  }, [props.shape, props.fillOpacity]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "strokeColor", props.stroke!)
  }, [props.shape, props.stroke]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "strokeWeight", props.strokeWidth!)
  }, [props.shape, props.strokeWidth]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "strokeOpacity", props.strokeOpacity!)
  }, [props.shape, props.strokeOpacity]);

  React.useEffect(() => {
    if (props.shape === "none") return;
    drawingManager.setStyle(props.shape!, "hintStrokeStyle", props.hintStrokeStyle!)
  }, [props.shape, props.hintStrokeStyle]);

  return (
    <DrawingManagerContext.Provider value={{ drawingManager }}>
      {props.children}
    </DrawingManagerContext.Provider>
  );
}

DrawingManager.defaultProps = {
  shape: "none",
  fill: "#39f",
  fillOpacity: 0.3,
  stroke: "#39f",
  strokeOpacity: 1,
  strokeWidth: 3,
  strokeStyle: "solid",
  hintStrokeStyle: "dashdot",
  hintStrokeOpacity: 0.3,
};

DrawingManager.propTypes = {
  /** 그리기 모양 */
  shape: PropTypes.oneOf(["marker", "rectangle", "circle", "ellipse", "polyline", "polygon", "arrow", "none"]),
  /** 선 색 (기본값: #39f) */
  stroke: PropTypes.string,
  /** 선의 두께 (기본값: 3) */
  strokeWidth: PropTypes.number,
  /** 보조선 스타일 */
  strokeStyle: PropTypes.oneOf(["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"]),
  /** 선의 불투명도 (0-1, 기본값: 1.0) */
  strokeOpacity: PropTypes.number,
  /** 채우기 색 (기본값: #39f) */
  fill: PropTypes.string,
  /** 채우기 불투명도 (0-1, 기본값: 1.0) */
  fillOpacity: PropTypes.number,
  /** 보조선 스타일 */
  hintStrokeStyle: PropTypes.oneOf(["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"]),
  /** 보조선 불투명도 (0-1, 기본값: 1.0) */
  hintStrokeOpacity: PropTypes.number,
  onDrawend: PropTypes.func.isRequired,
};

export default DrawingManager;
