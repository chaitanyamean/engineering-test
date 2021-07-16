import React, { useState } from "react"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ADD_NEW_ROLL, UPDATE_ROLL } from '../../../redux/actions';
interface Props {
  initialState?: RolllStateType
  size?: number
  onStateChange?: (newState: RolllStateType) => void
  student?: any
}
export const RollStateSwitcher: React.FC<Props> = ({ initialState = "unmark", size = 40, onStateChange, student }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStateOrAny) => state.roll)
  
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const setRolls = (student: any) => {
      // state.roll.rollList.map
      // console.log(state)
      let rollState: RolllStateType = "unmark"
      state.rollList.map((roll: any) => {
        if (roll.student_id === student.id) {
          rollState = roll.roll_state
        }
        return ""
      })
      return rollState
      
  }
  const [rollState, setRollState] = useState<RolllStateType>(setRolls(student))

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    if (onStateChange) {
      onStateChange(next)
    }
    let newRoll = {
      studentId: student.id,
      rollNext: next
    }

    if(state.rollList && state.rollList.length > 0) {

     let isfound = state.rollList.find((item: any) => item.studentId === newRoll.studentId)
     console.log(isfound)

     if(isfound) {
          dispatch(({type: UPDATE_ROLL, payload: newRoll}))
     } else {
       dispatch({type: ADD_NEW_ROLL, payload: newRoll})
     }
    } else {
      dispatch({type: ADD_NEW_ROLL, payload: newRoll})
    }
  }

  return <RollStateIcon type={rollState} size={size} onClick={onClick} />
}
