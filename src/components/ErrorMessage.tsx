interface ErrorMessageProps {
  type: 'no-otp' | 'invalid-otp'
}

const messages: Record<ErrorMessageProps['type'], { title: string; description: string }> = {
  'no-otp': {
    title: 'Código no encontrado',
    description: 'No se encontró un código de verificación en la URL. Asegúrate de acceder mediante el enlace correcto.',
  },
  'invalid-otp': {
    title: 'Código inválido',
    description: 'El código de verificación en la URL no es válido. Debe ser un número de exactamente 4 dígitos.',
  },
}

export function ErrorMessage({ type }: ErrorMessageProps) {
  const { title, description } = messages[type]

  return (
    <div className="text-center space-y-4" role="alert">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
