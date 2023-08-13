import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { Span } from 'styles/globalStyles'

interface CustomButtonProps extends ComponentPropsWithoutRef<'button'> {
  attention?: boolean
  dataCy?: string
  disabled?: boolean
  icon?: JSX.Element | null
  label: string | null
  showIconAfterLabel?: boolean
  suppressed?: boolean
  type?: 'submit' | 'reset' | 'button'
}

interface Button {
  attention: string | undefined
  suppressed: string | undefined
}

const Button = styled.button<Button>`
  all: unset;
  background-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: var(--radius-m);
  border-right-color: transparent;
  border-top-color: transparent;
  border: 1px solid transparent;
  color: var(--color-black);
  cursor: pointer;
  display: inline-block;
  font-family: var(--font-family);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 16px;
  padding: var(--spacing-0-75) var(--spacing-1-5);
  text-align: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;

  ${({ attention }) =>
    attention === 'true' &&
    css`
      color: var(--color-white);
      background-color: var(--color-black);
    `}
  ${({ suppressed }) =>
    suppressed === 'true' &&
    css`
      color: var(--color-neutral-400);
    `}

  &:hover {
    border-color: var(--color-neutral-600);
    box-shadow: (--box-shadow-low);
    color: var(--color-black);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

interface InnerButton {
  haslabel: string
  showiconafterlabel: string
}

const InnerButton = styled.div<InnerButton>`
  align-items: center;
  display: flex;

  .icon {
    line-height: 0;
    margin-right: ${({ haslabel, showiconafterlabel }) =>
    haslabel && !showiconafterlabel && 'var(--spacing-1-5)'};
    margin-left: ${({ haslabel, showiconafterlabel }) =>
    haslabel && showiconafterlabel && 'var(--spacing-1-5)'};
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      attention = false,
      dataCy = undefined,
      disabled = false,
      icon = null,
      label,
      showIconAfterLabel = false,
      suppressed = false,
      type = 'button',
      ...rest
    },
    ref
  ) => (
    <Button
      attention={attention.toString()}
      data-cy={dataCy}
      disabled={disabled}
      ref={ref}
      suppressed={suppressed.toString()}
      type={type}
      {...rest}
    >
      <InnerButton
        haslabel={Boolean(label).toString()}
        showiconafterlabel={showIconAfterLabel.toString()}
      >
        {icon && !showIconAfterLabel && <div className="icon">{icon}</div>}
        <Span>{label}</Span>
        {icon && showIconAfterLabel && <div className="icon">{icon}</div>}
      </InnerButton>
    </Button>
  )
)

CustomButton.displayName = 'CustomButton'

export default CustomButton
