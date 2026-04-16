import { useOtpFromUrl } from '../hooks/useOtpFromUrl'
import { OtpForm } from '../components/OtpForm'
import { ErrorMessage } from '../components/ErrorMessage'

export function VerifyPage() {
  const { expectedOtp, error } = useOtpFromUrl()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Verificación de código</h1>
          {!error && (
            <p className="mt-2 text-sm text-gray-500">
              Ingresa el código de 4 dígitos para continuar.
            </p>
          )}
        </div>

        {error ? (
          <ErrorMessage type={error} />
        ) : (
          <OtpForm expectedOtp={expectedOtp} />
        )}
      </div>
    </main>
  )
}
