// import { initialState } from "./initial-state";
import {
  ASC_FIRST,DES_FIRST
} from "./actions";

import {get, LocalStorageKey} from '../shared/helpers/local-storage'

console.log(get(LocalStorageKey.students))
let studentList = get(LocalStorageKey.students)

function reducer(state = {studentList}, action) {
  console.log(action.type)
  switch (action.type) {

    case ASC_FIRST : {
        let stateCopy = state.studentList;
      let data = sort(stateCopy, 'first_name')
      console.log(data)

      return {studentList: data}
      
    }

    case DES_FIRST : {

      let stateCopy = state.studentList;
      let data = sort(stateCopy, 'first_name')
      console.log(data)

      return {studentList: data.reverse()}
      
    }

    
    // console.log(state)
    default:
      return state;

  }
}

function sort(data, name) {
  console.log(data)
  // eslint-disable-next-line no-unused-expressions
  data.sort(function (a, b) {
    var nameA = a[name].toLowerCase();
    var nameB = b[name].toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  })
  return data
}

export default reducer;
