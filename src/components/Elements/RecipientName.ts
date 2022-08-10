import { IContact } from '../../store/storeTypes/contactsTypes'
import convertToContact from '../../utils/convertToContact'
import findPayloadHeadersData from '../../utils/findPayloadHeadersData'
import * as global from '../../constants/globalConstants'

const NO_RECIPIENT = '(No recipient)'

const RecipientName = (email: any, emailAddress: string): IContact => {
  const query = 'To'
  if (email && emailAddress) {
    const to = findPayloadHeadersData(query, email)
    if (to.length > 0) {
      if (to.includes(emailAddress)) {
        return { name: global.ME_LABEL, emailAddress }
      }
      return convertToContact(to)
    }
    return { name: NO_RECIPIENT, emailAddress: NO_RECIPIENT }
  }
  return { name: NO_RECIPIENT, emailAddress: NO_RECIPIENT }
}

export default RecipientName
