# tenel-react-kakao-map

[깃허브](https://github.com/inceptionJh/tenel-react-kakao-map) | [버그 리포트](https://github.com/inceptionJh/tenel-react-kakao-map/issues)

# Installation
```
$ npm install react react-dom tenel-react-kakao-map
```

# Getting Started

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

const App: React.FunctionComponent = () => {
  const [container, setContainer] = React.useState(null);
  const [mapCenter] = React.useState({ lat: 33.450701, lng: 126.570667 });

  return (
    <div ref={(ref) => setContainer(ref)} style={{ width: 800, height: 800 }}>
      {container ?
        ? (
          <KakaoMaps.Map
            container={ref.current}
            center={mapCenter}
            overlayMapTypes={overlayMapTypes}
          >
            <KakaoMaps.Marker position={mapCenter}/>
          </KakaoMaps.Map>
        )
        : <span>로드중...</span>
      }
    </div>
  );
};

```
