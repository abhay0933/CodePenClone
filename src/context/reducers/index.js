import { combineReducers } from "redux";
import userReducers from "./userReducers";
import projectReducers from "./projectReducers";

const myReducer = combineReducers({
    user: userReducers,
    project: projectReducers,
})

export default myReducer;

