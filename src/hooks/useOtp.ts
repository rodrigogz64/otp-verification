import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ClipboardEvent, ChangeEvent, FocusEvent } from 'react'
import { OTP_LENGTH } from '../constants'

export function useOtp(expectedOtp: string) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus()
  }, [])

  const refCallbacks = useMemo(
    () =>
      Array.from({ length: OTP_LENGTH }, (_, i) => (element: HTMLInputElement | null) => {
        inputRefs.current[i] = element
      }),
    [],
  )

  useEffect(() => {
    focusInput(0)
  }, [focusInput])

  const handleChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)

    setDigits(prev => {
      const next = [...prev]
      next[index] = digit
      return next
    })

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1)
    }
  }, [focusInput])

  const handleKeyDown = useCallback((index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        e.preventDefault()
        setDigits(prev => {
          const next = [...prev]
          next[index - 1] = ''
          return next
        })
        focusInput(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      e.preventDefault()
      focusInput(index + 1)
    }
  }, [digits, focusInput])

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)

    if (pasted.length === 0) return

    setDigits(prev => {
      const next = [...prev]
      for (let i = 0; i < pasted.length; i++) {
        next[i] = pasted[i]
      }
      return next
    })

    const focusIndex = Math.min(pasted.length, OTP_LENGTH) - 1
    setTimeout(() => focusInput(focusIndex), 0)
  }, [focusInput])

  const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }, [])

  const currentOtp = digits.join('')
  const isComplete = digits.every(d => d !== '')
  const isValid = isComplete && currentOtp === expectedOtp
  const hasError = isComplete && !isValid

  return {
    digits,
    refCallbacks,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
    isComplete,
    isValid,
    hasError,
  }
}
