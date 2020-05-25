import * as React from "react";

import PropTypes from "prop-types";

import EllipseContext from "./context";
import MapContext from "../Map/context";

import type { IKakao, TKakaoStrokeStyles, IKakaoEllipse, IKakaoMouseEvent, IKakaoEllipseOptions } from "tenel-kakao-map";

declare var kakao: IKakao;

export interface IKakaoMapsEllipseProps {
  className?: string;
  position: { lat: number, lng: number };
  rx: number;
  ry: number;
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

class Ellipse extends React.Component<IKakaoMapsEllipseProps> {
  context!: React.ContextType<typeof MapContext>;
  static contextType = MapContext;

  private ellipse: IKakaoEllipse;

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
    /** 맵에 표시될 좌표 */
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    /** 단위 : m */
    rx: PropTypes.number.isRequired,
    /** 단위 : m */
    ry: PropTypes.number.isRequired,
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

  constructor(props: IKakaoMapsEllipseProps) {
    super(props);

    const options: IKakaoEllipseOptions = {
      center: new kakao.maps.LatLng(props.position.lat, props.position.lng),
      rx: props.rx,
      ry: props.ry,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      zIndex: props.zIndex,
    };
    this.ellipse = new kakao.maps.Ellipse(options);

    kakao.maps.event.addListener(this.ellipse, "click", this.onClick);
    kakao.maps.event.addListener(this.ellipse, "mousemove", this.onMouseMove);
    kakao.maps.event.addListener(this.ellipse, "mousedown", this.onMouseDown);
    kakao.maps.event.addListener(this.ellipse, "mouseover", this.onMouseOver);
    kakao.maps.event.addListener(this.ellipse, "mouseout", this.onMouseOut);
  }

  public componentDidMount() {
    this.ellipse.setMap(this.context.map);
  }

  public componentWillUnmount() {
    kakao.maps.event.removeListener(this.ellipse, "click", this.onClick);
    kakao.maps.event.removeListener(this.ellipse, "mousemove", this.onMouseMove);
    kakao.maps.event.removeListener(this.ellipse, "mousedown", this.onMouseDown);
    kakao.maps.event.removeListener(this.ellipse, "mouseover", this.onMouseOver);
    kakao.maps.event.removeListener(this.ellipse, "mouseout", this.onMouseOut);

    this.ellipse.setMap(null);
  }

  public componentWillReceiveProps(nextProps: IKakaoMapsEllipseProps) {
    if (nextProps.position.lat !== this.props.position.lat || nextProps.position.lng !== this.props.position.lng) {
      const latlng = new kakao.maps.LatLng(nextProps.position.lat, nextProps.position.lng);
      this.ellipse.setPosition(latlng);
    }

    if (nextProps.rx !== this.props.rx || nextProps.ry !== this.props.ry) {
      this.ellipse.setRadius(nextProps.rx, nextProps.ry);
    }

    if (nextProps.fillColor !== this.props.fillColor) {
      this.ellipse.setOptions({ fillColor: nextProps.fillColor });
    }

    if (nextProps.fillOpacity !== this.props.fillOpacity) {
      this.ellipse.setOptions({ fillOpacity: nextProps.fillOpacity });
    }

    if (nextProps.strokeColor !== this.props.strokeColor) {
      this.ellipse.setOptions({ strokeColor: nextProps.strokeColor });
    }

    if (nextProps.strokeWeight !== this.props.strokeWeight) {
      this.ellipse.setOptions({ strokeWeight: nextProps.strokeWeight });
    }

    if (nextProps.strokeOpacity !== this.props.strokeOpacity) {
      this.ellipse.setOptions({ strokeOpacity: nextProps.strokeOpacity });
    }

    if (nextProps.strokeStyle !== this.props.strokeStyle) {
      this.ellipse.setOptions({ strokeStyle: nextProps.strokeStyle });
    }

    if (nextProps.zIndex !== this.props.zIndex) {
      this.ellipse.setZIndex(nextProps.zIndex!);
    }
  }

  public render() {
    return (
      <EllipseContext.Provider value={{ ellipse: this.ellipse }}>
        {this.props.children}
      </EllipseContext.Provider>
    );
  }

  private onClick = (e: IKakaoMouseEvent) => {
    this.props.onClick?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  };

  private onMouseMove = (e: IKakaoMouseEvent) => {
    this.props.onMouseMove?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  };

  private onMouseDown = (e: IKakaoMouseEvent) => {
    this.props.onMouseDown?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  };

  private onMouseOver = (e: IKakaoMouseEvent) => {
    this.props.onMouseOver?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  };

  private onMouseOut = (e: IKakaoMouseEvent) => {
    this.props.onMouseOut?.({
      position: {
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      },
    })
  };
};

export default Ellipse;
