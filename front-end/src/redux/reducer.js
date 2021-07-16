// import { initialState } from "./initial-state";
import {
  ASC_FIRST,DES_FIRST, 
  DES_SECOND,ASC_SECOND,
  SEARCH_TEXT,
  FILTER_BY_ROLL_STATE,
  GET_ALL_DATA
} from "./actions";

import {get, LocalStorageKey} from '../shared/helpers/local-storage'

let studentList = get(LocalStorageKey.students)

function reducer(state = {studentList}, action) {
  switch (action.type) {

    case ASC_FIRST : {

      let stateCopy = state.studentList;
      let data = sort(stateCopy, 'first_name')
      return {...state,studentList: data}
    }

    case DES_FIRST : {

      let stateCopy = state.studentList;
      let data = sort(stateCopy, 'first_name')
      return {...state,studentList: data.reverse()}
    }

    case ASC_SECOND : {

      let stateCopy = state.studentList;
      let data = sort(stateCopy, 'last_name')
      return {...state,studentList: data}
    }

    case DES_SECOND : {

      let stateCopy = state.studentList;
      let data = sort(stateCopy, 'last_name')
      return {...state,studentList: data.reverse()}      
    }

    case SEARCH_TEXT: {
      let data = state.studentList;
        let key = action.payload;
        if (action.payload !== "") {
        data = data.filter((student) => {
          return student.first_name.toLowerCase().includes(key.toLowerCase()) 
          || student.last_name.toLowerCase().includes(key.toLowerCase())
        })
        return {...state, studentList: data}
      }
      return {...state,studentList}
    }

    case FILTER_BY_ROLL_STATE: {
      let filteredArray = action.payload;
      let finalData =[];
      if(filteredArray && filteredArray.length > 0) {
        for(let item of filteredArray) {
          let obj = studentList.find((roll) => roll.id === item.studentId)
          if(obj) {
            finalData.push(obj)
          }
        }
      } else {
        finalData = studentList;
      }
    let newState = {
      ...state,
      studentList: finalData
    }
    return newState;
      
    }

    case GET_ALL_DATA: {
      return {studentList};
    }
    
    default:
      return state;

  }
}

function sort(data, name) {
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
