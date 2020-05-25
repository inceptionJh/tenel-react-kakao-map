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

class DrawingManager extends React.Component<IKakaoMapsDrawingManagerProps> {
  public drawingManager!: IKakaoDrawingManager;

  public static defaultProps = {
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

  public static propTypes = {
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

  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  constructor(props: IKakaoMapsDrawingManagerProps) {
    super(props);
  }

  public componentDidMount() {
    const options: IDrawingManagerOptions = {
      map: this.context.map,
      drawingMode: ["arrow", "circle", "ellipse", "marker", "polygon", "polyline", "rectangle"],
    };
    this.drawingManager = new kakao.maps.drawing.DrawingManager(options);

    this.drawingManager.addListener("drawend", this.onDrawend);

    if (this.props.shape !== "none") {
      this.drawingManager.setStyle(this.props.shape!, "fillColor", this.props.fill!)
      this.drawingManager.setStyle(this.props.shape!, "fillOpacity", this.props.fillOpacity!)
      this.drawingManager.setStyle(this.props.shape!, "strokeColor", this.props.stroke!)
      this.drawingManager.setStyle(this.props.shape!, "strokeWeight", this.props.strokeWidth!)
      this.drawingManager.setStyle(this.props.shape!, "strokeOpacity", this.props.strokeOpacity!)
      this.drawingManager.setStyle(this.props.shape!, "hintStrokeStyle", this.props.hintStrokeStyle!)
      this.drawingManager.select(this.props.shape!);
    }
  }

  public componentWillUnmount() {
    this.drawingManager.removeListener("drawend", this.onDrawend);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsDrawingManagerProps) {
    if (nextProps.shape !== this.props.shape) {
      nextProps.shape === "none"
        ? this.drawingManager.cancel()
        : this.drawingManager.select(nextProps.shape!);
    }

    if (nextProps.fill !== this.props.fill) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "fillColor", nextProps.fill!)
    }

    if (nextProps.fillOpacity !== this.props.fillOpacity) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "fillOpacity", nextProps.fillOpacity!)
    }

    if (nextProps.stroke !== this.props.stroke) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "strokeColor", nextProps.stroke!)
    }

    if (nextProps.strokeWidth !== this.props.strokeWidth) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "strokeWeight", nextProps.strokeWidth!)
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "strokeOpacity", nextProps.strokeOpacity!)
    }

    if (nextProps.hintStrokeStyle !== this.props.hintStrokeStyle) {
      if (nextProps.shape === "none") return;
      this.drawingManager.setStyle(nextProps.shape!, "hintStrokeStyle", nextProps.hintStrokeStyle!)
    }
  }

  public render() {
    return (
      <DrawingManagerContext.Provider value={{ drawingManager: this.drawingManager }}>
        {this.props.children}
      </DrawingManagerContext.Provider>
    );
  }

  private onDrawend = (mouseEvent: IKakaoDrawingMouseEvent) => {
    const data = this.drawingManager.getData();
    this.drawingManager.remove(mouseEvent.target);
    this.props.onDrawend?.(data[mouseEvent.overlayType][0]);

    if (this.props.shape === "none") {
      this.drawingManager.cancel();
    }

    if (this.props.shape !== "none") {
      this.drawingManager.select(this.props.shape!);
    }
  }
};

export default DrawingManager;
