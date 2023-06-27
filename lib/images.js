import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const urlForImage = (source) => {
  return `${publicRuntimeConfig.BACKEND_URL || ""}${
    source?.url
  }`
}

export const widthForImage = (source) =>
source?.width

export const heightForImage = (source) =>
source?.height