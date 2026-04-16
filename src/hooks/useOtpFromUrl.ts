import { useSearchParams } from 'react-router-dom'
import { OTP_PATTERN } from '../constants'

type OtpFromUrlResult =
  | { expectedOtp: string; error: null }
  | { expectedOtp: null; error: 'no-otp' | 'invalid-otp' }

export function useOtpFromUrl(): OtpFromUrlResult {
  const [searchParams] = useSearchParams()
  const otp = searchParams.get('otp')

  if (!otp) {
    return { expectedOtp: null, error: 'no-otp' }
  }

  if (!OTP_PATTERN.test(otp)) {
    return { expectedOtp: null, error: 'invalid-otp' }
  }

  return { expectedOtp: otp, error: null }
}
