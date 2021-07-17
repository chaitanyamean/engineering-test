import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { RolllStateType } from "shared/models/roll"
import { FILTER_BY_ROLL_STATE } from "redux/actions"
import { useDispatch } from 'react-redux';
interface Props {
  stateList: StateList[]
  rollList: RollItem[]
  onItemClick?: (type: ItemType) => void
  size?: number
  rollClick?: (type: any) => void
}
export const RollStateList: React.FC<Props> = ({ stateList, size = 14, onItemClick, rollList }) => {
  const dispatch = useDispatch();
  const onClick = (type: ItemType) => {
      let filteredState = rollList.filter((item: RollItem) => {
      if (item.rollNext === type) {
          return item.studentId
      }
    })
    const payload = {
      filteredState,
      type
    }
    dispatch({type: FILTER_BY_ROLL_STATE, payload: payload})
  }


  return (
    <S.ListContainer>
      {stateList.map((s, i) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={() => onClick(s.type)} />
              <span>{s.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon type={s.type} size={size} onClick={() => onClick(s.type)} />
            <span>{s.count}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}

interface StateList {
  type: ItemType
  count: number
}

interface RollItem {
  studentId: number;
  rollNext: string
}

type ItemType = RolllStateType | "all"
