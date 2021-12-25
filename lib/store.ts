import { createStore, action, Action, createTypedHooks } from "easy-peasy";
import { Song, Artist } from "@prisma/client";

export interface SongWithArtist extends Song {
  artist: Artist;
}

interface StoreModel {
  playing: boolean;
  activeSongs: Song[];
  activeSong: SongWithArtist;
  playSong: Action<StoreModel, boolean>;
  changeActiveSongs: Action<StoreModel, Song[]>;
  changeActiveSong: Action<StoreModel, SongWithArtist>;
}

export const store = createStore<StoreModel>({
  playing: false,
  activeSongs: [],
  activeSong: null,
  playSong: action((state, payload) => {
    state.playing = payload;
  }),
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload; // mutable operation is allowed in easy peasy, under the hood, immer turns this into immutable code
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();
export const { useStoreActions: useActions } = typedHooks;
export const { useStoreDispatch: useDispatch } = typedHooks;
export const { useStoreState: useSelector } = typedHooks;
