import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // importa el almacenamiento local
import { persistReducer, persistStore } from "redux-persist";
import podcastDetailsReducer from "./podCastDetailsSlice";
import episodeDetailsReducer from "./episodeDetailsSlice";

//redux-persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["podcastDetails", "episodeDetails"], // Especifica cuáles reducers quieres persistir
};

// Combine reducer before of use persisReducer
const rootReducer = combineReducers({
  podcastDetails: podcastDetailsReducer,
  episodeDetails: episodeDetailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
