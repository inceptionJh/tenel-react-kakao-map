import { IKakao, IKakaoDrawingManager, IKakaoDrawingMouseEvent, IDrawingManagerOptions, IKakaoDrawingOverayType, TKakaoStrokeStyles, TKakaoDrawingOverayTypeValue } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import DrawingManagerContext from "./context";
import KakaoMapContext from "../Map/context";

import * as _hooks from "./hooks";

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
  onDrawend: (mouseEvent: IKakaoDrawingMouseEvent) => void;
}

const DrawingManager: React.FunctionComponent<IKakaoMapsDrawingManagerProps> = (props) => {
  const mapCtx = React.useContext(KakaoMapContext);

  const [drawingManager] = React.useState<IKakaoDrawingManager>(() => {
    const options: IDrawingManagerOptions = {
      map: mapCtx.map,
    };
    return new kakao.maps.drawing.DrawingManager(options);
  });

  _hooks.useDrawShape(drawingManager, props.shape!);
  _hooks.useSetShapeStyle(drawingManager, props.shape!, {
    stroke: props.stroke!,
    strokeOpacity: props.strokeOpacity!,
    strokeStyle: props.strokeStyle!,
    strokeWidth: props.strokeWidth!,
    fill: props.fill!,
    fillOpacity: props.fillOpacity!,
    hintStrokeStyle: props.hintStrokeStyle!,
    hintStrokeOpacity: props.hintStrokeOpacity!,
  });
  _hooks.useDrawendEvent(drawingManager, props.onDrawend);

  return (
    <DrawingManagerContext.Provider value={{ drawingManager }}>
      {props.children}
    </DrawingManagerContext.Provider>
  );
};

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
