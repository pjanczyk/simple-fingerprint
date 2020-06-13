export async function getBatteryLevel() {
  return navigator.getBattery().then((battery) => battery.level);
}

export async function getBatteryCharging() {
  return navigator.getBattery().then((battery) => battery.charging);
}
