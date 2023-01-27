import type { TThreadObject } from 'store/storeTypes/emailListTypes'

import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'

const EmailAttachment = ({
  message,
}: {
  message: TThreadObject['messages'][0]
}) =>
  message?.payload?.files && message.payload.files.length > 0 ? (
    <S.AttachmentWrapper>
      {message.payload.files.map((item) => (
        <EmailAttachmentBubble
          attachmentData={item}
          messageId={message.id}
          key={item.body.attachmentId}
        />
      ))}
    </S.AttachmentWrapper>
  ) : null

export default EmailAttachment
