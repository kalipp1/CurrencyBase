import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
      });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD', expectedOutput: '$28.57' },
            { amount: 20, from: 'PLN', to: 'USD', expectedOutput: '$5.71' },
            { amount: 200, from: 'PLN', to: 'USD', expectedOutput: '$57.14' },
            { amount: 345, from: 'PLN', to: 'USD', expectedOutput: '$98.57' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('main-div');
            expect(output).toHaveTextContent('PLN '+testObj.amount+'.00 = '+testObj.expectedOutput);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: 100, from: 'USD', to: 'PLN', expectedOutput: 'PLN 350.00' },
            { amount: 20, from: 'USD', to: 'PLN', expectedOutput: 'PLN 70.00' },
            { amount: 200, from: 'USD', to: 'PLN', expectedOutput: 'PLN 700.00' },
            { amount: 345, from: 'USD', to: 'PLN', expectedOutput: 'PLN 1,207.50' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('main-div');
            expect(output).toHaveTextContent('$'+testObj.amount+'.00 = '+testObj.expectedOutput);
            cleanup();
        }
    });
    it('should render proper info about conversion when PLN -> PLN', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'PLN', expectedOutput: 'PLN 100.00' },
            { amount: 20, from: 'PLN', to: 'PLN', expectedOutput: 'PLN 20.00' },
            { amount: 200, from: 'PLN', to: 'PLN', expectedOutput: 'PLN 200.00' },
            { amount: 345, from: 'PLN', to: 'PLN', expectedOutput: 'PLN 345.00' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('main-div');
            expect(output).toHaveTextContent('PLN '+testObj.amount+'.00 = '+testObj.expectedOutput);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> USD', () => {
        const testCases = [
            { amount: 100, from: 'USD', to: 'USD', expectedOutput: '$100.00' },
            { amount: 20, from: 'USD', to: 'USD', expectedOutput: '$20.00' },
            { amount: 200, from: 'USD', to: 'USD', expectedOutput: '$200.00' },
            { amount: 345, from: 'USD', to: 'USD', expectedOutput: '$345.00' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('main-div');
            expect(output).toHaveTextContent('$'+testObj.amount+'.00 = '+testObj.expectedOutput);
            cleanup();
        }
    });
    it('should render proper info about conversion when PLN<0 -> USD', () => {
        const testCases = [
            { amount: -100, from: 'PLN', to: 'USD', expectedOutput: 'Wrong value ...' },
            { amount: -20, from: 'PLN', to: 'USD', expectedOutput: 'Wrong value ...' },
            { amount: -200, from: 'PLN', to: 'USD', expectedOutput: 'Wrong value ...' },
            { amount: -345, from: 'PLN', to: 'USD', expectedOutput: 'Wrong value ...' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('main-div');
            expect(output).toHaveTextContent('- PLN '+testObj.amount+'.00 = '+testObj.expectedOutput);
            cleanup();
        }
    });
});