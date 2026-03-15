import { isLinux, isMac, isWindows } from "./platform";

const playerVersion = import.meta.env.VITE_BITMOVIN_PLAYER_VERSION;

function getF1DeviceInfo() {
  let os: string = "";
  if (isWindows) {
    os = "windows";
  } else if (isMac) {
    os = "mac os";
  } else if (isLinux) {
    os = "linux";
  }

  let model: string = "";
  if (isMac) {
    model = "Macintosh";
  } else if (isWindows) {
    model = "Windows";
  } else if (isLinux) {
    model = "Linux";
  }

  let osVersion: string = "";
  if (isWindows) {
    osVersion = navigator.userAgent.match(/Windows NT (\d+\.\d+)/)?.[1] ?? "";
  } else if (isMac) {
    osVersion = navigator.userAgent.match(/Mac OS X (\d+_\d+_\d+)/)?.[1] ?? "";
  } else if (isLinux) {
    osVersion = navigator.userAgent.match(/Linux (\d+\.\d+\.\d+)/)?.[1] ?? "";
  }

  const browser = "chrome";
  const browserVersion = navigator.userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)?.[1] ?? "";

  const info = {
    device: "web",
    screen: "browser",
    os,
    browser,
    browserVersion,
    model,
    osVersion,
    appVersion: "release-R29.0.3",
    playerVersion,
  };

  return Object.entries(info)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");
}

export const defaultHeaders: Record<string, string> = {
  "x-f1-device-info": getF1DeviceInfo(),
  "ascendontoken":
    "eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJFeHRlcm5hbEF1dGhvcml6YXRpb25zQ29udGV4dERhdGEiOiJJTkQiLCJTdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJTdWJzY3JpYmVySWQiOiIyMjYwMTA2MTciLCJGaXJzdE5hbWUiOiJTaGFzaGFuayIsImVudHMiOlt7ImNvdW50cnkiOiJJTkQiLCJlbnQiOiJSRUcifSx7ImNvdW50cnkiOiJJTkQiLCJlbnQiOiJQUkVNSVVNIn1dLCJMYXN0TmFtZSI6IlNhaSIsImV4cCI6MTc3MzgxNzgxMCwiU2Vzc2lvbklkIjoiZXlKaGJHY2lPaUpvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBeEx6QTBMM2h0YkdSemFXY3RiVzl5WlNOb2JXRmpMWE5vWVRJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmlkU0k2SWpFd01ERXhJaXdpYzJraU9pSTJNR0U1WVdRNE5DMWxPVE5rTFRRNE1HWXRPREJrTmkxaFpqTTNORGswWmpKbE1qSWlMQ0pvZEhSd09pOHZjMk5vWlcxaGN5NTRiV3h6YjJGd0xtOXlaeTkzY3k4eU1EQTFMekExTDJsa1pXNTBhWFI1TDJOc1lXbHRjeTl1WVcxbGFXUmxiblJwWm1sbGNpSTZJakl5TmpBeE1EWXhOeUlzSW1sa0lqb2lOelZoTmpGaE9EWXROVEkwWXkwME1UQTVMV0ppTXpFdFpEbG1ORFppTVRneFpqZ3dJaXdpZENJNklqRWlMQ0pzSWpvaVpXNHRSMElpTENKa1l5STZJak0yTkRRaUxDSmhaV1FpT2lJeU1ESTJMVEF6TFRJNFZEQTNPakV3T2pFd0xqVTVNVm9pTENKa2RDSTZJakVpTENKbFpDSTZJakl3TWpZdE1EUXRNVE5VTURjNk1UQTZNVEF1TlRreFdpSXNJbU5sWkNJNklqSXdNall0TURNdE1UVlVNRGM2TVRBNk1UQXVOVGt4V2lJc0ltbHdJam9pTWpZd056cG1Zamt5T2pVNE1EcGhZemc2WXpobE5UcGlOR00yT2pabU1UUTZPV000WlNJc0ltTWlPaUpUUVV4VUlFeEJTMFVnUTBsVVdTSXNJbk4wSWpvaVZWUWlMQ0p3WXlJNklqZzBNVEF5SWl3aVkyOGlPaUpWVTBFaUxDSnVZbVlpT2pFM056TTBOekl5TVRBc0ltVjRjQ0k2TVRjM05qQTJOREl4TUN3aWFYTnpJam9pWVhOalpXNWtiMjR1ZEhZaUxDSmhkV1FpT2lKaGMyTmxibVJ2Ymk1MGRpSjkuMVp6elN4eWVsQ25qS3hWUUpJRlotR1dwZXJyQlNVWVoxWFcxRWVmZ1JQOCIsImlhdCI6MTc3MzQ3MjIxMCwiU3Vic2NyaWJlZFByb2R1Y3QiOiJGMSBUViBQcmVtaXVtIEFubnVhbCIsImp0aSI6ImUyZjBlOWFlLTY1MDAtNGJhZC1hYjNmLWJkN2E0Mzc5YmE0YiIsImhhc2hlZFN1YnNjcmliZXJJZCI6Ind4UEoybk5raVhMTklQN2Q0VDdjdUNUZ3dNc0MzYVFVV1pJc1NpSmo4S1k9In0.isOPm7yEEIhgk8BsAC_59xrbQ1bE9ayMmkeLbueKNTpL6q5ot4i_GByBGjH-lo0vl_ju__Mg7WO2y6WBr3_rL7skizOwYda2e3u_8XG0KJJk65Xu-EQejJ1x9YcTir_QhSWzeXsZGq9mZw_tg52rmo9b-JjQf0pGlOCHDx-3kET-MVWFQCP-r_2xR7tCHbKS8bbTRj7yXcXSvf_l9VIzF_-LvMQqm2QoIXMQ4vqn7oXpEJF-IANIxvhVgtPZFDZVTCPQuXzMN_1ussbPpocRO7ZrIIvn4BzeYaqVmMCCZWtOtqj-jpyuaZjm0zhnmY-FTXtDXHEh0pjgRpnwANoJWg",
};
