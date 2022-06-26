import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import {
  FiCheckSquare,
  FiMoreHorizontal,
  FiEdit,
  FiInbox,
  FiSearch,
} from 'react-icons/fi'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import * as S from './NavigationStyles'
import * as global from '../../../constants/globalConstants'
import Routes from '../../../constants/routes.json'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  navigateTo,
  selectInSearch,
  setInSearch,
} from '../../../Store/utilsSlice'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import NavigationMore from './More/NavigationMore'
import StyledTooltip from '../../Elements/StyledTooltip'
import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../Store/emailDetailSlice'

const SIZE = 16

const Navigation = () => {
  const [active, setActive] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inSearch = useAppSelector(selectInSearch)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (location.pathname.includes('inbox')) {
      setActive('inbox')
    }
    if (location.pathname.includes('compose')) {
      setActive('compose')
    }
    if (location.pathname === '/') {
      setActive('todo')
    }
  }, [location])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      !inSearch &&
      !location.pathname.includes('/compose') &&
      !isReplying &&
      !isForwarding
    ) {
      if (keysPressed.includes(global.KEY_DIGIT_1)) {
        dispatch(navigateTo(Routes.HOME))
      }
      if (keysPressed.includes(global.KEY_DIGIT_2)) {
        dispatch(navigateTo(Routes.INBOX))
      }
      if (keysPressed.includes(global.KEY_DIGIT_3)) {
        dispatch(setInSearch(true))
      }
      if (keysPressed.includes(global.KEY_DIGIT_4)) {
        dispatch(navigateTo('/compose'))
      }
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch, location, isReplying, isForwarding])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const NavControllers = useMemo(
    () => (
      <S.NavControls>
        <S.NavList>
          <StyledTooltip title="To Do">
            <S.NavItem>
              <CustomIconButton
                icon={<FiCheckSquare size={SIZE} />}
                onClick={() => dispatch(navigateTo(Routes.HOME))}
                isActive={active === 'todo'}
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Inbox">
            <S.NavItem>
              <CustomIconButton
                icon={<FiInbox size={SIZE} />}
                onClick={() => dispatch(navigateTo(Routes.INBOX))}
                isActive={active === 'inbox'}
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Search">
            <S.NavItem>
              <CustomIconButton
                icon={<FiSearch size={SIZE} />}
                isActive={active === 'search'}
                onClick={() => dispatch(setInSearch(true))}
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Compose">
            <S.NavItem>
              <CustomIconButton
                icon={<FiEdit size={SIZE} />}
                isActive={active === 'compose'}
                onClick={() => dispatch(navigateTo('/compose'))}
              />
            </S.NavItem>
          </StyledTooltip>

          <S.NavItem>
            <CustomIconButton
              onClick={handleClick}
              icon={<FiMoreHorizontal size={SIZE} />}
            />
          </S.NavItem>
          <NavigationMore
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </S.NavList>
      </S.NavControls>
    ),
    [active, open]
  )

  return NavControllers
}

export default Navigation
