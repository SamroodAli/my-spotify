import { createStore, action, Action } from "easy-peasy";
import { Song } from "@prisma/client";

interface StoreModel {
  activeSongs: Song[];
  activeSong: Song;
  changeActiveSongs: Action<StoreModel, Song[]>;
  changeActiveSong: Action<StoreModel, Song>;
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload; //mutable operation is allowed in easy peasy, under the hood, immer turns this into immutable code
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});