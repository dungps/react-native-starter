import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist";
import reducers from "./reducers";

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => __DEV__,
  collapsed: true,
  duration: true
});

var createAppStore = applyMiddleware(thunk, logger)(createStore);

const configureStore = (onComplate: ?() => void) => {
  const store = autoRehydrate()(createAppStore)(reducers);
  persistStore(
    store,
    { storage: AsyncStorage, blacklist: ["data"] },
    onComplate
  );

  if (isDebuggingInChrome) {
    window.store = store;
  }

  return store;
};

export default configureStore;
