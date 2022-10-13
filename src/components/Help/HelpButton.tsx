import { useCallback } from 'react'
import { selectInSearch, setActiveModal } from '../../store/utilsSlice'
import { setModifierKey } from '../../utils/setModifierKey'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import * as S from './HelpStyles'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import StyledTooltip from '../Elements/StyledTooltip'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { QiInfo } from '../../images/svgIcons/quillIcons'

const SIZE = 16
const BUTTON_TITLE = 'Feedback and help'

const actionKeysKeyboard = [setModifierKey, keyConstants.KEY_FORWARD_SLASH]
const actionKeysFeedback = [setModifierKey, keyConstants.KEY_DOT]

const customStyles = {
  background: 'var(--color-white)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-m)',
  boxShadow: 'var(--box-shadow-low)',
  lineHeight: 1,
  padding: '10px 12px',
}

const HelpButton = ({ activeModal, handleEvent }: { activeModal: string | null, handleEvent: (activeModal: string | null) => void }) => {
  const inSearch = useAppSelector(selectInSearch)
  const dispatch = useAppDispatch()

  const handleShowKeyboardShortcuts = useCallback(() => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard))
  }, [dispatch])

  useMultiKeyPress(handleShowKeyboardShortcuts, actionKeysKeyboard, inSearch)

  const handleShowFeedback = useCallback(() => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback))
  }, [dispatch])

  useMultiKeyPress(handleShowFeedback, actionKeysFeedback, inSearch)

  return (
    <StyledTooltip title={BUTTON_TITLE}>
      <S.StartButtonWrapper>
        <CustomIconButton
          icon={<QiInfo size={SIZE} />}
          onClick={() => handleEvent(activeModal)}
          style={customStyles}
          title=""
        />
      </S.StartButtonWrapper>
    </StyledTooltip>
  )
}

export default HelpButton
