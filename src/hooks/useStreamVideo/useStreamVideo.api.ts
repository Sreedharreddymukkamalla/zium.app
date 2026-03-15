import { fetchJSON } from "../../utils/api";
import { isSafari } from "../../utils/platform";
import { streamVideoBodyValidator } from "./useStreamVideo.validator";

export type VideoStreamInfo =
  | {
      streamType: "HLS";
      videoUrl: string;
    }
  | {
      streamType: "other";
      videoUrl: string;
      laURL?: string;
    };

// Safari (including Apple Vision Pro) requires HLS streams; send a Safari UA so the
// F1 API returns HLS instead of DASH+Widevine, which is not supported on WebKit.
const DEVICE_INFO_CHROME = "device=web;screen=browser;os=mac os;browser=chrome;browserVersion=122.0.0.0;model=Macintosh;osVersion=14.3.1;appVersion=release-R29.0.3;playerVersion=8.129.0";
const DEVICE_INFO_SAFARI = "device=web;screen=browser;os=mac os;browser=safari;browserVersion=17.0;model=Macintosh;osVersion=14.0;appVersion=release-R29.0.3;playerVersion=8.129.0";

export const fetchVideoStream = async (playbackUrl: string, signal: AbortSignal): Promise<VideoStreamInfo> => {
  const baseUrl = "/2.0/R/ENG/WEB_HLS/ALL";
  const body = await fetchJSON(
    `${baseUrl}/${playbackUrl}`,
    {
      headers: {
        "x-f1-device-info": isSafari ? DEVICE_INFO_SAFARI : DEVICE_INFO_CHROME,
      },
    },
    signal,
  );
  const parsedBody = streamVideoBodyValidator.parse(body);

  if (parsedBody.resultObj.streamType === "HLS") {
    return { videoUrl: parsedBody.resultObj.url, streamType: "HLS" };
  }

  const isUrlM3u8 = parsedBody.resultObj.url.endsWith(".m3u8");
  if (isUrlM3u8) {
    return { videoUrl: parsedBody.resultObj.url, streamType: "HLS" };
  }

  return {
    videoUrl: parsedBody.resultObj.url,
    laURL: parsedBody.resultObj.laURL,
    streamType: "other",
  };
};
