import * as React from "react";

import PropTypes from "prop-types";

import RectangleContext from "./context";
import MapContext from "../Map/context";

import type { IKakao, TKakaoStrokeStyles, IKakaoRectangle, IKakaoMouseEvent, IKakaoRectangleOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsRectangleProps {
  className?: string;
  bounds: [{ lat: number, lng: number }, { lat: number, lng: number }];
  fillColor?: string;
  fillOpacity?: number;
  /** 단위 : px */
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

class Rectangle extends React.Component<IKakaoMapsRectangleProps> {
  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  private rectangle: IKakaoRectangle;

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
    /**
     * bounds[0] : Position ( SW )
     * bounds[1] : Position ( NE )
     */
    bounds: PropTypes.arrayOf(Position).isRequired as PropTypes.Validator<[
      PropTypes.InferProps<{
        lat: PropTypes.Validator<number>;
        lng: PropTypes.Validator<number>;
      }>,
      PropTypes.InferProps<{
        lat: PropTypes.Validator<number>;
        lng: PropTypes.Validator<number>;
      }>
    ]>,
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

  constructor(props: IKakaoMapsRectangleProps) {
    super(props);

    const sw = new kakao.maps.LatLng(this.props.bounds[0].lat, this.props.bounds[0].lng);
    const ne = new kakao.maps.LatLng(this.props.bounds[1].lat, this.props.bounds[1].lng);
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    const options: IKakaoRectangleOptions = {
      bounds,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    this.rectangle = new kakao.maps.Rectangle(options);

    kakao.maps.event.addListener(this.rectangle, "click", this.onClick);
    kakao.maps.event.addListener(this.rectangle, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.rectangle, "mousedown", this.onMouseDown);
    kakao.maps.event.addListener(this.rectangle, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.rectangle, "mouseout", this.onMouseOut);
  }

  public componentDidMount() {
    this.rectangle.setMap(this.context.map);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.rectangle, "click", this.onClick);
    kakao.maps.event.removeListener(this.rectangle, "mousemove", this.onMouseMove);
    kakao.maps.event.removeListener(this.rectangle, "mousedown", this.onMouseDown);
    kakao.maps.event.removeListener(this.rectangle, "mouseover", this.onMouseOver);
    kakao.maps.event.removeListener(this.rectangle, "mouseout", this.onMouseOut);

    this.rectangle.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsRectangleProps) {
    const nextBounds = nextProps.bounds.flat(Infinity).map((point: { lat: number, lng: number }) => `${point.lat},${point.lng}`).join();
    const currentBounds = this.props.bounds.flat(Infinity).map((point: { lat: number, lng: number }) => `${point.lat},${point.lng}`).join();
    if (nextBounds !== currentBounds) {
      const sw = new kakao.maps.LatLng(this.props.bounds[0].lat, this.props.bounds[0].lng);
      const ne = new kakao.maps.LatLng(this.props.bounds[1].lat, this.props.bounds[1].lng);
      const bounds = new kakao.maps.LatLngBounds(sw, ne);
      this.rectangle.setBounds(bounds);
    }

    if (nextProps.fillColor !== this.props.fillColor) {
      this.rectangle.setOptions({ fillColor: nextProps.fillColor });
    }

    if (nextProps.fillOpacity !== this.props.fillOpacity) {
      this.rectangle.setOptions({ fillOpacity: nextProps.fillOpacity });
    }

    if (nextProps.strokeColor !== this.props.strokeColor) {
      this.rectangle.setOptions({ strokeColor: nextProps.strokeColor });
    }

    if (nextProps.strokeWeight !== this.props.strokeWeight) {
      this.rectangle.setOptions({ strokeWeight: nextProps.strokeWeight });
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      this.rectangle.setOptions({ strokeOpacity: nextProps.strokeOpacity });
    }

    if (nextProps.strokeStyle !== this.props.strokeStyle) {
      this.rectangle.setOptions({ strokeStyle: nextProps.strokeStyle });
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.rectangle.setZIndex(nextProps.zIndex!);
    }
  }

  public render() {
    return (
      <RectangleContext.Provider value={{ rectangle: this.rectangle }}>
        {this.props.children}
      </RectangleContext.Provider>
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

export default Rectangle;
