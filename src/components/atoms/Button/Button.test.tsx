import { fireEvent, render, screen } from '@testing-library/react';
import Button from './';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays children correctly', () => {
    render(<Button>Child Text</Button>);
    expect(screen.getByText('Child Text')).toBeInTheDocument();
  });

  it('displays icon when provided', () => {
    const IconComponent = () => <span>Icon</span>;
    render(<Button icon={<IconComponent />}>Button with Icon</Button>);
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Button with Icon')).toBeInTheDocument();
  });
});
