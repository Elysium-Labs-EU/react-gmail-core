import { useMemo, useState } from 'react'

import * as global from 'constants/globalConstants'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'

import Contributions from './Contributions/Contributions'
import General from './General/General'
import SettingsSidebar from './SettingsSidebar/SettingsSidebar'
import * as S from './SettingsStyles'
import CustomModal from '../Elements/Dialog/CustomDialog'

const SETTINGS = 'Settings'

const Settings = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const activeModal = useAppSelector(selectActiveModal)

  const memoizedGeneral = useMemo(() => <General />, [])

  // handleChangeFocus({
  //   direction: 'down',
  //   focusedItemIndex,
  //   setFocusedItemIndex,
  //   sourceTag: 'settings-sidebar-list-item',
  // })

  // const memoizedSidebar = useMemo(
  //   () => (
  //     <SettingsSidebar
  //       focusedItemIndex={focusedItemIndex}
  //       setFocusedItemIndex={setFocusedItemIndex}
  //     />
  //   ),
  //   [focusedItemIndex]
  // )

  // const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   // console.log('event', event)

  //   if (event?.code === undefined) return
  //   if (event.code === keyConstants.KEY_ARROWS.down) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     handleChangeFocus({
  //       direction: 'down',
  //       focusedItemIndex,
  //       setFocusedItemIndex,
  //       sourceTag: 'command-palette-list-item',
  //     })
  //   }
  //   if (event.code === keyConstants.KEY_ARROWS.up) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     handleChangeFocus({
  //       direction: 'up',
  //       focusedItemIndex,
  //       setFocusedItemIndex,
  //       sourceTag: 'command-palette-list-item',
  //     })
  //   }
  //   // if (event.code === keyConstants.KEY_SPECIAL.escape) {
  //   //   event.preventDefault()
  //   //   event.stopPropagation()
  //   //   handleKeyEscape()
  //   // }
  //   // if (event.code === keyConstants.KEY_SPECIAL.enter) {
  //   //   event.preventDefault()
  //   //   event.stopPropagation()
  //   //   handleKeyEnter()
  //   // }
  // }

  return (
    <CustomModal
      modalAriaLabel="settings"
      modalTitle={SETTINGS}
      open={activeModal === global.ACTIVE_MODAL_MAP.settings}
    >
      <S.SettingsContainer>
        <SettingsSidebar
          focusedItemIndex={focusedItemIndex}
          setFocusedItemIndex={setFocusedItemIndex}
        />
        {focusedItemIndex === 0 ? memoizedGeneral : null}
        {focusedItemIndex === 2 ? <Contributions /> : null}
      </S.SettingsContainer>
    </CustomModal>
  )
}

export default Settings
