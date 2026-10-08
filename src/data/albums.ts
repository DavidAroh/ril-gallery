import additionalPhotos from "./additional-photos.json";

export type GalleryPhoto = {
  file: string;
  alt: string;
  collection?: string;
  collectionLabel?: string;
};
export type PhotoCollection = { id: string; label: string; source: string };
export type Album = {
  id: string;
  name: string;
  folder: string;
  photos: GalleryPhoto[];
  collections: PhotoCollection[];
};

const originalAlbums = [
  {
    id: "miws",
    name: "MIWS",
    folder: "1o9UQJQVZDdFXPuB-qfXEtC3EKOyynZi3",
    photos: [
      {
        file: "miws-1",
        alt: "Participants working with laptops around a shared table",
      },
      { file: "miws-2", alt: "A conversation during a MIWS session" },
      {
        file: "miws-3",
        alt: "A MIWS participant sharing ideas with a microphone",
      },
    ],
  },
  {
    id: "summer",
    name: "Kids Summer Camp",
    folder: "1qm_vAbsS_6lhgKIONit_GbDWDREWw8m4",
    photos: [
      { file: "summer-1", alt: "A mentor helping children build at a table" },
      { file: "summer-2", alt: "Children learning together with laptops" },
      {
        file: "summer-3",
        alt: "A young camper smiling with a Young Innovator sign",
      },
      {
        file: "summer-4",
        alt: "Summer campers holding their creativity and innovation signs",
      },
    ],
  },
  {
    id: "kcc",
    name: "KCC",
    folder: "1R9nJTsspRYXkg7VW7740o4raDFQCWq6x",
    photos: [
      {
        file: "kcc-1",
        alt: "Schoolchildren taking part in a KCC classroom session",
      },
      { file: "kcc-2", alt: "Children listening to a mentor in the classroom" },
      {
        file: "kcc-3",
        alt: "Students smiling while working together on a laptop",
      },
    ],
  },
  {
    id: "hack",
    name: "Hack and Chill",
    folder: "1Xwv52_L9AXLgSarmQnr5S55iu5ZAx4r5",
    photos: [
      {
        file: "hack-1",
        alt: "A Hack and Chill participant speaking to the group",
      },
      {
        file: "hack-2",
        alt: "A community member smiling and holding a microphone",
      },
      {
        file: "hack-3",
        alt: "Participants exchanging ideas during Hack and Chill",
      },
    ],
  },
  {
    id: "demo",
    name: "Demo Day",
    folder: "1tart3F1fZRN4i8gbxaeIQFRra3JBg1Dj",
    photos: [],
  },
  {
    id: "friday-play",
    name: "Friday Play It",
    folder: "1cIlTpxi2YUNw6DUjj8p49PubYi1VMrH2",
    photos: [],
  },
  {
    id: "nacos",
    name: "NACOS",
    folder: "1FHjveeMCGq6-0QC0UiaQyhSXO9czrTNa",
    photos: [],
  },
  {
    id: "powerpoint",
    name: "PowerPoint Friday",
    folder: "1JT4LmKk5fnxKmvrE9pb6vvYWbmJ4-HpA",
    photos: [],
  },
  {
    id: "seeess",
    name: "SEEESS Event",
    folder: "1xOk_3q_o1kSxUpQcmufUN9oH1Fl7aq2l",
    photos: [],
  },
];

export const albums: Album[] = originalAlbums.map((album) => ({
  ...album,
  photos: [
    ...album.photos.map((photo) => ({
      ...photo,
      collection: "original",
      collectionLabel: "Original collection",
      ...additionalPhotos.matches.find((match) => match.file === photo.file),
    })),
    ...additionalPhotos.photos.filter((photo) => photo.album === album.id),
  ],
  collections: [
    ...(album.photos.length
      ? [{
          id: "original",
          label: "Original collection",
          source: `https://drive.google.com/drive/folders/${album.folder}`,
        }]
      : []),
    ...additionalPhotos.collections.filter(
      (collection) => collection.album === album.id,
    ),
  ],
}));
