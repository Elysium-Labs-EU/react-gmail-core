import toast from 'react-hot-toast'

import * as global from 'constants/globalConstants'
import { updateEmailLabel } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import { findLabelByName } from 'utils/findLabel'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'

interface ISetToDoMail {
  threadId: string
  labelIds: TLabelState['labelIds']
  dispatch: AppDispatch
  storageLabels: TLabelState['storageLabels']
}

const setToDoMail = ({
  threadId,
  labelIds,
  dispatch,
  storageLabels,
}: ISetToDoMail) => {
  const toDoLabel = findLabelByName({
    storageLabels,
    LABEL_NAME: global.TODO_LABEL_NAME,
  })
  if (toDoLabel && toDoLabel.id) {
    const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })
    const request = {
      // Take out the SENT label, since that label can never be removed.
      removeLabelIds: onlyLegalLabels.filter(
        (label) => label !== global.SENT_LABEL
      ),
      addLabelIds: [toDoLabel.id],
    }
    dispatch(updateEmailLabel({ threadId, request, labelIds: onlyLegalLabels }))
  } else {
    toast.error("Cannot find 'To Do' label")
  }
}

export default setToDoMail
