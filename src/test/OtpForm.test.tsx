import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { VerifyPage } from '../pages/VerifyPage'

function renderWithRouter(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </MemoryRouter>
  )
}

function getInputs() {
  return screen.getAllByRole('textbox') as HTMLInputElement[]
}

function getButton() {
  return screen.getByRole('button', { name: /verificar código/i })
}

describe('OTP Verification', () => {
  it('enables the button when the correct OTP is entered', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=1234')

    const inputs = getInputs()
    const button = getButton()

    expect(button).toBeDisabled()

    await user.click(inputs[0])
    await user.keyboard('1234')

    expect(button).toBeEnabled()
  })

  it('keeps the button disabled with an incomplete code', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=5678')

    const inputs = getInputs()
    const button = getButton()

    await user.click(inputs[0])
    await user.keyboard('56')

    expect(inputs[0]).toHaveValue('5')
    expect(inputs[1]).toHaveValue('6')
    expect(inputs[2]).toHaveValue('')
    expect(inputs[3]).toHaveValue('')
    expect(button).toBeDisabled()
  })

  it('distributes a pasted 4-digit code across all inputs', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=4321')

    const inputs = getInputs()

    await user.click(inputs[0])
    await user.paste('4321')

    expect(inputs[0]).toHaveValue('4')
    expect(inputs[1]).toHaveValue('3')
    expect(inputs[2]).toHaveValue('2')
    expect(inputs[3]).toHaveValue('1')

    expect(getButton()).toBeEnabled()
  })

  it('ignores non-numeric characters when pasting', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=1234')

    const inputs = getInputs()

    await user.click(inputs[0])
    await user.paste('a1b2c3d4')

    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('4')
  })

  it('moves focus back on backspace in an empty field', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=9999')

    const inputs = getInputs()

    await user.click(inputs[0])
    await user.keyboard('99')

    expect(document.activeElement).toBe(inputs[2])

    await user.keyboard('{Backspace}')
    expect(inputs[1]).toHaveValue('')
    expect(document.activeElement).toBe(inputs[1])
  })

  it('shows the success screen after submitting the correct code', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=5555')

    const inputs = getInputs()

    await user.click(inputs[0])
    await user.keyboard('5555')
    await user.click(getButton())

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/verificación exitosa/i)).toBeInTheDocument()
  })

  it('shows an inline error when the entered code is wrong', async () => {
    const user = userEvent.setup()
    renderWithRouter('/verify?otp=1234')

    const inputs = getInputs()

    await user.click(inputs[0])
    await user.keyboard('0000')

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/el código ingresado no es correcto/i)).toBeInTheDocument()
    expect(getButton()).toBeDisabled()
  })

  it('shows an error when no OTP is in the URL', () => {
    renderWithRouter('/verify')

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/código no encontrado/i)).toBeInTheDocument()
  })

  it('shows an error when the OTP in the URL is invalid', () => {
    renderWithRouter('/verify?otp=abc')

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/código inválido/i)).toBeInTheDocument()
  })
})
