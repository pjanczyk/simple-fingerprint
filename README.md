# simple-fingerprint

*Simple browser fingerprinting library*

---

Demo: [https://pjanczyk.github.io/simple-fingerprint/](https://pjanczyk.github.io/simple-fingerprint/)

### Installing

```bash
npm install simple-fingerprint
```

```bash
yarn add simple-fingerprint
```

### Usage

#### Simple usage

Compute a stable browser fingerprint:

```javascript
import { computeFingerprint } from "simple-fingerprint";

let fingerprint = await computeFingerprint();
```

`computeFingerprint()` returns an SHA1 hash of a fingerprint, e.g., `"2fd4e1c67a2d28fced849ee1bb76e7391b93eb12"`.

#### Advanced usage

Compute components of a fingerprint:

```javascript
import { computeFingerprintComponents } from "simple-fingerprint";

let components = await computeFingerprintComponents();
```

`computeFingerprintComponents()` returns an object with the following properties:

```
{
  devicePixelRatio: number | null
  userAgent: string | null
  platform: string | null
  plugins: string | null
  headers: string | null
  dateFormat: string | null
  fonts: string | null
  batteryCharging: boolean | null
  batteryLevel: number | null
  canvas2dRender: string | null
  webglRenderer: string | null
  webglRender: string | null
}
```

Note that `batteryCharging` and `batteryLevel` are _not_ stable and may change over time.
