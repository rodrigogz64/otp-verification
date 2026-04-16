import type { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent } from 'react'
import { OTP_LENGTH } from '../constants'

interface OtpInputProps {
  index: number
  value: string
  hasError: boolean
  onChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
  onFocus: (e: FocusEvent<HTMLInputElement>) => void
  inputRef: (element: HTMLInputElement | null) => void
}

export function OtpInput({
  index,
  value,
  hasError,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  inputRef,
}: OtpInputProps) {
  const borderColor = hasError
    ? 'border-red-400 focus-visible:ring-red-500 focus-visible:border-red-500'
    : 'border-gray-300 focus-visible:ring-indigo-500 focus-visible:border-indigo-500'

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]"
      maxLength={1}
      value={value}
      onChange={e => onChange(index, e)}
      onKeyDown={e => onKeyDown(index, e)}
      onPaste={onPaste}
      onFocus={onFocus}
      aria-label={`Dígito ${index + 1} de ${OTP_LENGTH}`}
      autoComplete={index === 0 ? 'one-time-code' : 'off'}
      className={`w-14 h-16 text-center text-2xl font-semibold rounded-lg border-2
        bg-white text-gray-900 transition-all duration-150
        focus:outline-none focus-visible:ring-2
        hover:border-gray-400
        ${borderColor}`}
    />
  )
}
