import { render, screen } from '@testing-library/react';
import App from './App';

test('renders scoreboard and controls', () => {
  render(<App />);
  expect(screen.getByText(/Score/i)).toBeInTheDocument();
  expect(screen.getByText(/Level/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /pause|resume/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
});
