import React, { useEffect, useState } from "react";
import sha1 from "js-sha1";
import {
  computeFingerprint,
  computeFingerprintComponents,
} from "simple-fingerprint";

function Row({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td style={{ whiteSpace: "pre-wrap" }}>{value}</td>
    </tr>
  );
}

function App() {
  let [fingerprint, setFingerprint] = useState(null);
  let [components, setComponents] = useState(null);

  useEffect(() => {
    computeFingerprint().then(setFingerprint);
    computeFingerprintComponents().then(setComponents);
  }, []);

  if (!fingerprint || !components) {
    return "Computing...";
  }

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Component</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <Row name="Device pixel ratio" value={components.devicePixelRatio} />
          <Row name="Platform" value={components.platform} />
          <Row name="User-agent" value={components.userAgent} />
          <Row name="Plugins" value={components.plugins} />
          <Row name="Request headers" value={components.headers} />
          <Row name="Date format" value={components.dateFormat} />
          <Row name="Fonts" value={components.fonts} />
          <Row
            name="Canvas 2D render"
            value={
              <>
                <img
                  src={components.canvas2dRender}
                  style={{
                    imageRendering: "pixelated",
                    width: "400px",
                  }}
                  alt="Canvas 2D render"
                />
                <div>{sha1(components.canvas2dRender)}</div>
              </>
            }
          />
          <Row name="WebGL renderer info" value={components.webglRenderer} />
          <Row
            name="WebGL render"
            value={
              <>
                <img
                  src={components.webglRender}
                  style={{
                    imageRendering: "pixelated",
                    width: "200px",
                  }}
                  alt="WebGL render"
                />
                <div>{sha1(components.webglRender)}</div>
              </>
            }
          />
          <Row
            name="Battery Level (unstable)"
            value={components.batteryLevel}
          />
          <Row
            name="Battery Charging (unstable)"
            value={String(components.batteryCharging)}
          />
        </tbody>
        <tfoot>
          <Row
            name={<b>Combined fingerprint</b>}
            value={<b>{fingerprint}</b>}
          />
        </tfoot>
      </table>
    </div>
  );
}

export default App;
