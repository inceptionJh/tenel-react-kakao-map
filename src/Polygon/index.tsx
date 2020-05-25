import { IKakao, TKakaoStrokeStyles, IKakaoPolygon, IKakaoMouseEvent, IKakaoPolygonOptions } from "tenel-kakao-map";

import * as React from "react";

import PropTypes from "prop-types";

import MapContext from "../Map/context";
import PolygonContext from "./context";

declare var kakao: IKakao;

export interface IKakaoMapsPolygonProps {
  className?: string;
  path: { lat: number, lng: number }[][] | { lat: number, lng: number }[];
  fillColor?: string;
  fillOpacity?: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: TKakaoStrokeStyles;
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

class Polygon extends React.Component<IKakaoMapsPolygonProps> {
  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  private polygon: IKakaoPolygon;

  public static defaultProps = {
    fillColor: "transparent",
    fillOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 1,
    strokeOpacity: 1,
    strokeStyle: "solid",
    zIndex: 0,
  };

  public static propTypes = {
    /** Position : { lat: number, lng: number } */
    path: PropTypes.oneOfType([
      PropTypes.arrayOf(Position).isRequired,
      PropTypes.arrayOf(PropTypes.arrayOf(Position).isRequired).isRequired,
    ]).isRequired,
    /** 채움 색 */
    fillColor: PropTypes.string,
    /** 채움 색의 불투명도 ( 0 ~ 1 ) */
    fillOpacity: PropTypes.number,
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

  constructor(props: IKakaoMapsPolygonProps) {
    super(props);

    const path = (props.path as any).map((positionOrPath: { lat: number, lng: number } | { lat: number, lng: number }[]) => {
      if ("lat" in positionOrPath) {
        return new kakao.maps.LatLng(positionOrPath.lat, positionOrPath.lng);
      } else {
        return positionOrPath.map((position) => {
          return new kakao.maps.LatLng(position.lat, position.lng);
        });
      }
    });
    const options: IKakaoPolygonOptions = {
      path,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    this.polygon = new kakao.maps.Polygon(options);

    kakao.maps.event.addListener(this.polygon, "click", this.onClick);
    kakao.maps.event.addListener(this.polygon, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.polygon, "mousedown", this.onMouseDown);
    kakao.maps.event.addListener(this.polygon, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.polygon, "mouseout", this.onMouseOut);
  };

  public componentDidMount() {
    this.polygon.setMap(this.context.map);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.polygon, "click", this.onClick);
    kakao.maps.event.removeListener(this.polygon, "mousemove", this.onMouseMove);
    kakao.maps.event.removeListener(this.polygon, "mousedown", this.onMouseDown);
    kakao.maps.event.removeListener(this.polygon, "mouseover", this.onMouseOver);
    kakao.maps.event.removeListener(this.polygon, "mouseout", this.onMouseOut);

    this.polygon.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsPolygonProps) {
    const nextPath = nextProps.path.flat(Infinity).map((point: any) => `${point.lat},${point.lng}`).join();
    const currentPath = this.props.path.flat(Infinity).map((point: any) => `${point.lat},${point.lng}`).join();
    if (nextPath !== currentPath) {
      this.polygon.setPath((nextProps.path as any).map((positionOrPath: { lat: number, lng: number } | { lat: number, lng: number }[]) => {
        if ("lat" in positionOrPath) {
          return new kakao.maps.LatLng(positionOrPath.lat, positionOrPath.lng);
        } else {
          return positionOrPath.map((position) => {
            return new kakao.maps.LatLng(position.lat, position.lng);
          });
        }
      }));
    }

    if (nextProps.fillColor !== this.props.fillColor) {
      this.polygon.setOptions({ fillColor: nextProps.fillColor });
    }

    if (nextProps.fillOpacity !== this.props.fillOpacity) {
      this.polygon.setOptions({ fillOpacity: nextProps.fillOpacity });
    }

    if (nextProps.strokeColor !== this.props.strokeColor) {
      this.polygon.setOptions({ strokeColor: nextProps.strokeColor });
    }

    if (nextProps.strokeWeight !== this.props.strokeWeight) {
      this.polygon.setOptions({ strokeWeight: nextProps.strokeWeight });
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      this.polygon.setOptions({ strokeOpacity: nextProps.strokeOpacity });
    }

    if (nextProps.strokeStyle !== this.props.strokeStyle) {
      this.polygon.setOptions({ strokeStyle: nextProps.strokeStyle });
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.polygon.setZIndex(nextProps.zIndex!);
    }
  }

  public render() {
    return (
      <PolygonContext.Provider value={{ polygon: this.polygon }}>
        {this.props.children}
      </PolygonContext.Provider >
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

  public onMouseMove = (e: IKakaoMouseEvent) => {
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

export default Polygon;
