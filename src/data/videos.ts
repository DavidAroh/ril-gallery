export type GalleryVideo = { id: string; title: string };

export const albumVideos: Record<string, GalleryVideo[]> = {
  miws: [{ id: "l9x81t", title: "MIWS · August" }],
  summer: [
    { id: "zd6lsq", title: "Kids Summer Camp · Film 1" },
    { id: "gtr8g7", title: "Kids Summer Camp · Film 2" },
  ],
  kcc: [{ id: "mweahj", title: "KCC" }],
  hack: [{ id: "xaou8y", title: "Hack and Chill" }],
};
