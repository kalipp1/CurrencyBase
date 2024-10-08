import { render, screen } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const action = jest.fn();

    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button

    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
  ];

    const submitButton = screen.getByText('Convert');
    const amountField = screen.getByTestId('amount');
    const fromField = screen.getByTestId('from-select');
    const toField = screen.getByTestId('to-select');

    userEvent.click(submitButton);

    // expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
    for(const testObj of testCases) {
        userEvent.type(amountField, testObj.amount);
        userEvent.selectOptions(fromField, testObj.from);
        userEvent.selectOptions(toField, testObj.to);

      // Click the submit button
        userEvent.click(submitButton);

        expect(action).toHaveBeenCalledWith({ amount: testObj.amount, from: testObj.from, to: testObj.to });
        expect(action).toHaveBeenCalledTimes(1);
        cleanup();
      }
  });
});