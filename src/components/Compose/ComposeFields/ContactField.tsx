// import { isEqual } from 'lodash'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type {
  Dispatch,
  SetStateAction,
} from 'react'

import * as global from 'constants/globalConstants'
import type { IContact } from 'store/storeTypes/contactsTypes'
import emailValidation from 'utils/emailValidation'

import { recipientListTransform } from '../ComposeEmail'
import type { IRecipientsList } from '../ComposeEmailTypes'
import RecipientField from './Generic/RecipientField'

const ContactField = ({
  composeValue = undefined,
  updateComposeEmail,
  loadState,
  showField,
  id,
  label,
  setHasInteracted,
  hasInteracted,
}: {
  composeValue?: IContact[]
  updateComposeEmail: (object: { id: string; value: IContact[] }) => void
  loadState: string
  showField: boolean
  id: string
  label: string
  setHasInteracted: Dispatch<SetStateAction<boolean>>
  hasInteracted: boolean
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [value, setValue] = useState<IContact[]>([])
  const [error, setError] = useState<boolean>(false)

  // Listens to the parent component changes, and updates the internal state in case there is preloaded data.
  useEffect(() => {
    if (
      loadState === global.LOAD_STATE_MAP.loaded &&
      composeValue &&
      !Object.is(composeValue, value)
    ) {
      setValue(composeValue)
    }
  }, [composeValue, loadState])

  const handleDelete = useCallback(
    (selectedOption: IContact) => {
      const filteredValue = value.filter((item) => item !== selectedOption)
      setValue(filteredValue)
      const updateEventObject = {
        id,
        value: filteredValue,
      }
      updateComposeEmail(updateEventObject)
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [id, value, hasInteracted, composeValue, updateComposeEmail]
  )

  const handleChange = useCallback(
    (recipientListRaw: IRecipientsList) => {
      const recipientList = recipientListTransform(recipientListRaw)
      const validation = emailValidation(recipientList.newValue)
      if (validation) {
        setValue(recipientList.newValue)
        error && setError(false)
        const updateEventObject = {
          id,
          value: recipientList.newValue,
        }
        updateComposeEmail(updateEventObject)
      }
      if (!validation) {
        setError(true)
      }
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [error, composeValue, id, hasInteracted, updateComposeEmail]
  )

  const registerOnKeyDown = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }, [hasInteracted, setHasInteracted])

  const memoizedField = useMemo(
    () => (
      <RecipientField
        error={error}
        fieldId={id}
        fieldLabel={label}
        handleChangeRecipients={handleChange}
        handleDelete={handleDelete}
        inputValue={inputValue}
        recipientFieldValue={value}
        registerOnKeyDown={registerOnKeyDown}
        setInputValue={setInputValue}
        showField={showField}
      />
    ),
    [inputValue, error, handleChange, value, id, label]
  )

  return memoizedField
}

export default ContactField
