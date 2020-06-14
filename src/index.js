import {
  getDateFormat,
  getDevicePixelRatio,
  getFonts,
  getHeaders,
  getPlatform,
  getPlugins,
  getUserAgent,
} from "./basic";
import { getBatteryCharging, getBatteryLevel } from "./battery";
import { getCanvas2dRender } from "./canvas2d";
import { getWebglRender, getWebglRenderer } from "./webgl";
import sha1 from "js-sha1";

async function runCatching(f) {
  try {
    return await f();
  } catch {
    return null;
  }
}

async function computeStableComponents() {
  return {
    devicePixelRatio: await runCatching(getDevicePixelRatio),
    userAgent: await runCatching(getUserAgent),
    platform: await runCatching(getPlatform),
    plugins: await runCatching(getPlugins),
    headers: await runCatching(getHeaders),
    dateFormat: await runCatching(getDateFormat),
    fonts: await runCatching(getFonts),
    canvas2dRender: await runCatching(getCanvas2dRender),
    webglRenderer: await runCatching(getWebglRenderer),
    webglRender: await runCatching(getWebglRender),
  };
}

async function computeUnstableComponents() {
  return {
    batteryCharging: await runCatching(getBatteryCharging),
    batteryLevel: await runCatching(getBatteryLevel),
  };
}

async function computeFingerprintComponents() {
  return {
    ...(await computeStableComponents()),
    ...(await computeUnstableComponents()),
  };
}

async function computeFingerprint() {
  let components = await computeStableComponents();
  let concatenated = Object.values(components).map(String).join("\n");
  return sha1(concatenated);
}

export { computeFingerprintComponents, computeFingerprint };
