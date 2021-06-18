import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import projects from "./projects/reducer";

const logger =
  process.env.NODE_ENV === "development" && createLogger({ collapsed: true });

const dragonboatMiddleware = [thunk];

const middleware = [...dragonboatMiddleware, logger].filter(Boolean);

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

const store = createStore(
  combineReducers({
    projects,
  }),
  {},
  enhancer
);

export default store;
