// import { initialState } from "./initial-state";
import {
    ADD_NEW_ROLL,
    UPDATE_ROLL,

  } from "./actions";
  
  import {get, LocalStorageKey} from '../shared/helpers/local-storage'
  
  console.log(get(LocalStorageKey.students))
//   let studentList = get(LocalStorageKey.students)

const initialState = {
    rollList: []
}
  
  function rollReducer(state = initialState, action) {
    //   console.log(state);
    //   console.log(action)
    switch(action.type) {
        case ADD_NEW_ROLL: {
            
            return {
                rollList: [...state.rollList, action.payload]
            }
        }

        case UPDATE_ROLL: {
            const rollList = state.rollList.map((item) => {
                if(item.studentId === action.payload.studentId) {
                    item.rollNext = action.payload.rollNext
                }
                return item
            })

            const updatedState = {
                rollList : rollList
            }

            return updatedState;

        }
        
        
        default:
            return state
        }
  }
  
  
  
  export default rollReducer;
  