import * as React from "react";

import PropTypes from "prop-types";

import MapContext from "../Map/context";
import CircleContext from "./context";

import type { IKakao, IKakaoCircle, TKakaoStrokeStyles, IKakaoMouseEvent, IKakaoCircleOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsCircleProps {
  className?: string;
  center: { lat: number, lng: number };
  /** 단위 : m */
  radius?: number;
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

class Circle extends React.Component<IKakaoMapsCircleProps> {
  private circle: IKakaoCircle;

  context!: React.ContextType<typeof MapContext>
  static contextType = MapContext;

  public static defaultProps = {
    radius: 10,
    fillColor: "transparent",
    fillOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 1,
    strokeOpacity: 1,
    strokeStyle: "solid",
    zIndex: 0,
  };

  public static propTypes = {
    /** 맵에 표시될 좌표 */
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    /** 단위 : m */
    radius: PropTypes.number,
    /** 채움 색 */
    fillColor: PropTypes.string,
    /** 채움 색의 불투명도 ( 0 ~ 1 ) */
    fillOpacity: PropTypes.number,
    /** 채움 색 */
    strokeColor: PropTypes.string,
    /** 채움 불투명도 ( 0 ~ 1 ) */
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

  constructor(props: IKakaoMapsCircleProps) {
    super(props);

    const options: IKakaoCircleOptions = {
      center: new kakao.maps.LatLng(this.props.center.lat, this.props.center.lng),
      radius: this.props.radius,
      zIndex: this.props.zIndex,
      fillColor: this.props.fillColor,
      fillOpacity: this.props.fillOpacity,
      strokeColor: this.props.strokeColor,
      strokeWeight: this.props.strokeWeight,
      strokeOpacity: this.props.strokeOpacity,
      strokeStyle: this.props.strokeStyle,
    };
    this.circle = new kakao.maps.Circle(options);

    kakao.maps.event.addListener(this.circle, "click", this.onClick);
    kakao.maps.event.addListener(this.circle, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.circle, "mousedown", this.onMouseDown);
    kakao.maps.event.addListener(this.circle, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.circle, "mouseout", this.onMouseOut);
  }

  public componentDidMount() {
    this.circle.setMap(this.context.map);
  }

  public componentWillUnmount() {
    this.circle.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsCircleProps) {
    if (nextProps.center.lat !== this.props.center.lat || nextProps.center.lng !== this.props.center.lng) {
      const latlng = new kakao.maps.LatLng(nextProps.center.lat, nextProps.center.lng);
      this.circle.setPosition(latlng);
    }

    if (nextProps.radius !== this.props.radius) {
      this.circle.setRadius(nextProps.radius!);
    }

    if (nextProps.fillColor !== this.props.fillColor) {
      this.circle.setOptions({ fillColor: nextProps.fillColor });
    }

    if (nextProps.fillOpacity !== this.props.fillOpacity) {
      this.circle.setOptions({ fillOpacity: nextProps.fillOpacity });
    }

    if (nextProps.strokeWeight !== this.props.strokeWeight) {
      this.circle.setOptions({ strokeWeight: nextProps.strokeWeight });
    }

    if (nextProps.strokeColor !== this.props.strokeColor) {
      this.circle.setOptions({ strokeColor: nextProps.strokeColor });
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      this.circle.setOptions({ strokeOpacity: nextProps.strokeOpacity });
    }

    if (nextProps.strokeStyle !== this.props.strokeStyle) {
      this.circle.setOptions({ strokeStyle: nextProps.strokeStyle });
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.circle.setZIndex(nextProps.zIndex!);
    }
  }

  private onClick = (e: IKakaoMouseEvent) => {
    this.props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  }

  private onMouseMove = (e: IKakaoMouseEvent) => {
    this.props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  }

  private onMouseDown = (e: IKakaoMouseEvent) => {
    this.props.onMouseDown?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  }

  private onMouseOver = (e: IKakaoMouseEvent) => {
    this.props.onMouseOver?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  }

  private onMouseOut = (e: IKakaoMouseEvent) => {
    this.props.onMouseOut?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  }

  public render() {
    return (
      <CircleContext.Provider value={{ circle: this.circle }}>
        {this.props.children}
      </CircleContext.Provider>
    );
  }
};

export default Circle;
