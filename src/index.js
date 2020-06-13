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
import { getCanvas2d } from "./canvas2d";
import { getWebgl, getWebglRenderer } from "./webgl";

async function runCatching(f) {
  try {
    return await f();
  } catch {
    return null;
  }
}

export default async function computeFingerprint() {
  return {
    devicePixelRatio: await runCatching(getDevicePixelRatio),
    userAgent: await runCatching(getUserAgent),
    platform: await runCatching(getPlatform),
    plugins: await runCatching(getPlugins),
    headers: await runCatching(getHeaders),
    dateFormat: await runCatching(getDateFormat),
    fonts: await runCatching(getFonts),
    batteryCharging: await runCatching(getBatteryCharging),
    batteryLevel: await runCatching(getBatteryLevel),
    canvas2d: await runCatching(getCanvas2d),
    webglRenderer: await runCatching(getWebglRenderer),
    webgl: await runCatching(getWebgl),
  };
}
