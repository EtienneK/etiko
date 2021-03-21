/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import Home from '../../../pages/index'

describe('Home', () => {
  it('renders', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'etiko.io' })
    ).toBeInTheDocument()
  })
})
