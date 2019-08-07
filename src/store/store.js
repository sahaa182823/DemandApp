import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunkMiddleware from "redux-thunk";



import demandReducer from "../reducers/demandReducer";
import demandFulFillmentReducer from "../reducers/demandFulFillmentReducer";
import resourceFullFillmentReducer from "../reducers/resourceFullFillmentReducer";
import viewEditReducer from "../reducers/viewEditReducer";
import statusCountReducer from "../reducers/statusCount";

export default () => {
    const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
    const store = createStore(combineReducers({
       
     
     
        demand: demandReducer,
        demandFullFillment:demandFulFillmentReducer,
        resourceFulFillment:resourceFullFillmentReducer,
        viewEditData: viewEditReducer,
        demandStatus: statusCountReducer

    }),
        compose(applyMiddleware(thunkMiddleware), reduxDevtools),
    )
    return store;
}