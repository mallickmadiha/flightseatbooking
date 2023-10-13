import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should render children', () => {
    const { getByTestId } = render(
        <App/>
    );

    getByTestId('test-content');
  });
});
