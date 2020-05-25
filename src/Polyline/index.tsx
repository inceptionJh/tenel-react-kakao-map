import { IKakao, TKakaoStrokeStyles, IKakaoPolyline, IKakaoMouseEvent, IKakaoPolylineOptions } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import PolylineContext from "./context";
import MapContext from "../Map/context";

declare var kakao: IKakao;

export interface IKakaoMapsPolylineProps {
  className?: string;
  path: { lat: number, lng: number }[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: TKakaoStrokeStyles;
  endArrow?: boolean;
  zIndex?: number;
  onClick?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseDown?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseMove?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOver?: (e: { position: { lat: number, lng: number } }) => void;
  onMouseOut?: (e: { position: { lat: number, lng: number } }) => void;
}

const Position = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
}).isRequired;

class Polyline extends React.Component<IKakaoMapsPolylineProps> {
  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  private polyline: IKakaoPolyline;

  public static defaultProps = {
    strokeColor: "#000",
    strokeWeight: 1,
    strokeOpacity: 1,
    strokeStyle: "solid",
    endArrow: false,
    zIndex: 0,
  };

  public static propTypes = {
    /** Position : { lat: number, lng: number } */
    path: PropTypes.arrayOf(Position).isRequired,
    /** 선 색 */
    strokeColor: PropTypes.string,
    /** 선 불투명도 ( 0 ~ 1 ) */
    strokeOpacity: PropTypes.number,
    /** 선의 두께 ( 단위 : px ) */
    strokeWeight: PropTypes.number,
    /** 선 스타일 */
    strokeStyle: PropTypes.oneOf(["solid", "shortdash", "shortdot", "shortdashdot", "shortdashdotdot", "dot", "dash", "dashdot", "longdash", "longdashdot", "longdashdotdot"]),
    /** z-index 속성 값 */
    zIndex: PropTypes.number,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onClick: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onMouseDown: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onMouseMove: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onMouseOver: PropTypes.func,
    /** (e: { position: { lat: number, lng: number } }) => void */
    onMouseOut: PropTypes.func,
  };

  constructor(props: IKakaoMapsPolylineProps) {
    super(props);

    const options: IKakaoPolylineOptions = {
      path: props.path.map((point) => new kakao.maps.LatLng(point.lat, point.lng)),
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      endArrow: props.endArrow,
      zIndex: props.zIndex,
    };
    this.polyline = new kakao.maps.Polyline(options);

    kakao.maps.event.addListener(this.polyline, "click", this.onClick);
    kakao.maps.event.addListener(this.polyline, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.polyline, "mousedown", this.onMouseDown);
    kakao.maps.event.addListener(this.polyline, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.polyline, "mouseout", this.onMouseOut);
  }

  public componentDidMount() {
    this.polyline.setMap(this.context.map);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.polyline, "click", this.onClick);
    kakao.maps.event.removeListener(this.polyline, "mousemove", this.onMouseMove);
    kakao.maps.event.removeListener(this.polyline, "mousedown", this.onMouseDown);
    kakao.maps.event.removeListener(this.polyline, "mouseover", this.onMouseOver);
    kakao.maps.event.removeListener(this.polyline, "mouseout", this.onMouseOut);

    this.polyline.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsPolylineProps) {
    const nextPath = nextProps.path.map((point) => `${point.lat},${point.lng}`).join();
    const currentPath = this.props.path.map((point) => `${point.lat},${point.lng}`).join();
    if (nextPath !== currentPath) {
      this.polyline.setPath(nextProps.path.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng);
      }));
    }

    if (nextProps.strokeColor !== this.props.strokeColor) {
      this.polyline.setOptions({ strokeColor: nextProps.strokeColor });
    }

    if (nextProps.strokeWeight !== this.props.strokeWeight) {
      this.polyline.setOptions({ strokeWeight: nextProps.strokeWeight });
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      this.polyline.setOptions({ strokeOpacity: nextProps.strokeOpacity });
    }

    if (nextProps.strokeStyle !== this.props.strokeStyle) {
      this.polyline.setOptions({ strokeStyle: nextProps.strokeStyle });
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.polyline.setZIndex(nextProps.zIndex!);
    }
  }

  public render() {
    return (
      <PolylineContext.Provider value={{ polyline: this.polyline }}>
        {this.props.children}
      </PolylineContext.Provider >
    );
  }

  private onClick = (e: IKakaoMouseEvent) => {
    this.props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  private onMouseMove = (e: IKakaoMouseEvent) => {
    this.props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  private onMouseDown = (e: IKakaoMouseEvent) => {
    this.props.onMouseDown?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  private onMouseOver = (e: IKakaoMouseEvent) => {
    this.props.onMouseOver?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }

  private onMouseOut = (e: IKakaoMouseEvent) => {
    this.props.onMouseOut?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    });
  }
};

export default Polyline;
