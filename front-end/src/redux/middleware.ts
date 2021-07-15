import { DES_FIRST } from "./actions";

import { takeEvery } from "redux-saga/effects";

export function* addTodo() {
  yield takeEvery(DES_FIRST, function* () {
    // We can perform async operations here
    // No need of async calls for now
  });
}

export default function* () {
//   yield* addTodo();
}
