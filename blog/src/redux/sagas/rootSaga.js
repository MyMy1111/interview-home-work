import { all } from "redux-saga/effects";
import blogsSaga from "./blogSaga";

export default function* rootSaga(){
  yield all([
    blogsSaga()
  ])
}