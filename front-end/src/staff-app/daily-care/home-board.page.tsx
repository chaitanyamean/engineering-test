import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import InputBase from '@material-ui/core/InputBase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useDispatch, useSelector } from "react-redux";

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const dispatch = useDispatch()

  

  const res: any = useSelector(state => {
    return state
})

console.log(res)
  
  useEffect(() => {
    void getStudents({ type: '' })
  }, [getStudents])

  const searchAPIDebounced = AwesomeDebouncePromise(getStudents, 500);

  const onToolbarAction = (action: ToolbarAction, value?: string) => {
    if (action === "roll") {
      setIsRollMode(true)
    } else {
      dispatch({type: value})
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
    console.log(action)

  }

  const onSearchAction = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(data?.students)

    if(e) {
      let target = e.target.value;
      console.log(target)
      await searchAPIDebounced({type: 'search', key: target})
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} onSearch={onSearchAction}/>

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded"  && res?.studentList && (
          <>
            {res?.studentList.map((s: any) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"

interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  onSearch: (e?: React.ChangeEvent<HTMLInputElement> | any) => void

}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, onSearch } = props

  return (
    <S.ToolbarContainer>
      <div>
        <div>
          First Name
          <FontAwesomeIcon onClick={() => onItemClick("sort", "ASC_FIRST")} style={{ cursor: "pointer" }}  icon="sort-alpha-up" size="1x" />
          <FontAwesomeIcon onClick={() => onItemClick("sort", "DES_FIRST")} style={{ cursor: "pointer" }}  icon="sort-alpha-down" size="1x" />
        </div>
        <div>
          Second Name
          <FontAwesomeIcon onClick={() => onItemClick("sort", "ASC-SECOND")} style={{ cursor: "pointer" }}  icon="sort-alpha-up" size="1x" />
          <FontAwesomeIcon onClick={() => onItemClick("sort", "DES-SECOND")} style={{ cursor: "pointer" }}  icon="sort-alpha-down" size="1x" />
        </div>

      </div>

      <S.InputBase onChange={onSearch}/>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  InputBase: styled(InputBase)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
      background-color: white;
    }
  `,
}
