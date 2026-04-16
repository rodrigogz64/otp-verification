import { useState } from 'react'
import { useOtp } from '../hooks/useOtp'
import { OtpInput } from './OtpInput'

interface OtpFormProps {
  expectedOtp: string
}

export function OtpForm({ expectedOtp }: OtpFormProps) {
  const {
    digits,
    refCallbacks,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
    isValid,
    hasError,
  } = useOtp(expectedOtp)

  const [verified, setVerified] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      setVerified(true)
    }
  }

  if (verified) {
    return (
      <div className="text-center space-y-4" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Verificación exitosa</h2>
        <p className="text-gray-500">El código ingresado es correcto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <div
          role="group"
          aria-label="Código de verificación de 4 dígitos"
          className="flex justify-center gap-3"
        >
          {digits.map((digit, index) => (
            <OtpInput
              key={index}
              index={index}
              value={digit}
              hasError={hasError}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onFocus={handleFocus}
              inputRef={refCallbacks[index]}
            />
          ))}
        </div>

        {hasError && (
          <p className="mt-3 text-center text-sm text-red-500" role="alert">
            El código ingresado no es correcto.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        aria-disabled={!isValid}
        className="w-full rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-200
          enabled:bg-indigo-600 enabled:text-white enabled:hover:bg-indigo-700 enabled:cursor-pointer
          enabled:shadow-md enabled:hover:shadow-lg
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Verificar código
      </button>
    </form>
  )
}
