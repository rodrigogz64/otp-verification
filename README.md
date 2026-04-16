# OTP Verification

Pantalla de verificación por código OTP (One-Time Password) de 4 dígitos construida con React + TypeScript.

## Requisitos previos

- Node.js >= 18

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre el navegador en la URL indicada por Vite (por defecto `http://localhost:5173`).

Para probar la verificación, navega a:

```
http://localhost:5173/verify?otp=1234
```

Puedes cambiar `1234` por cualquier código de 4 dígitos numéricos.

## Tests

```bash
npm test
```

Se incluyen 9 pruebas automatizadas con Vitest + React Testing Library:

1. El botón se habilita al ingresar el OTP correcto.
2. El botón permanece deshabilitado con un código incompleto.
3. Pegar un código de 4 dígitos lo distribuye correctamente entre los inputs.
4. Los caracteres no numéricos en el pegado se ignoran.
5. Backspace en un campo vacío retrocede al campo anterior.
6. Se muestra la pantalla de éxito tras verificar el código correcto.
7. Se muestra error inline al ingresar un código incorrecto.
8. Se muestra error cuando no hay OTP en la URL.
9. Se muestra error cuando el OTP en la URL es inválido.

## Estructura del proyecto

```
src/
├── components/
│   ├── ErrorMessage.tsx    # Mensajes de error para URLs inválidas
│   ├── OtpForm.tsx         # Formulario con lógica de submit y estado de éxito
│   └── OtpInput.tsx        # Input individual de un dígito
├── hooks/
│   ├── useOtp.ts           # Lógica de estado, navegación y validación del OTP
│   └── useOtpFromUrl.ts    # Extracción y validación del OTP desde query params
├── pages/
│   └── VerifyPage.tsx      # Página principal de verificación
├── test/
│   ├── OtpForm.test.tsx    # 9 pruebas del flujo completo
│   └── setup.ts            # Configuración de testing-library
├── App.tsx                 # Routing de la aplicación
├── constants.ts            # OTP_LENGTH y OTP_PATTERN
├── index.css               # Import de TailwindCSS
└── main.tsx                # Entry point
```

## Decisiones técnicas

- **React + Vite** en lugar de Next.js: al no necesitar SSR, API routes ni routing basado en archivos, Vite ofrece un setup más ligero y tiempos de arranque más rápidos.
- **`type="text"` con `inputMode="numeric"`** en los inputs: evita el comportamiento nativo de `type="number"` (flechas de incremento, scroll) que interfiere con la experiencia OTP.
- **Hooks custom (`useOtp`, `useOtpFromUrl`)**: separan la lógica de negocio de la presentación, facilitando el testing y la reutilización.
- **TailwindCSS v4**: ofrece utilidades suficientes para una UI clara sin necesidad de crear archivos CSS adicionales.
- **React Router**: permite leer los query params (`?otp=XXXX`) con `useSearchParams` de forma declarativa y estándar.

## Supuestos

- El OTP esperado se obtiene exclusivamente desde los query params de la URL.
- Solo se soportan códigos de exactamente 4 dígitos numéricos.
- No se requiere persistencia ni backend; la validación es puramente del lado del cliente.
- Al verificar exitosamente, se muestra un mensaje de confirmación sin redirigir a otra pantalla.
- Cualquier ruta que no sea `/verify` redirige automáticamente a `/verify`.

## Qué mejoraría con más tiempo

- **Internacionalización (i18n)**: externalizar textos para soportar múltiples idiomas.
- **Animaciones**: transiciones suaves al cambiar de estado (error → éxito), micro-animaciones en los inputs al recibir un dígito.
- **Reintentos**: permitir al usuario reiniciar el formulario y volver a intentar si ingresa un código incorrecto.
- **Rate limiting visual**: mostrar un contador de intentos fallidos y bloquear temporalmente.
- **Responsive avanzado**: adaptar tamaños de inputs y tipografía para pantallas muy pequeñas.
- **E2E tests con Cypress/Playwright**: cubrir el flujo completo incluyendo navegación real.
- **Dark mode**: aprovechar TailwindCSS para soportar tema oscuro automáticamente.
