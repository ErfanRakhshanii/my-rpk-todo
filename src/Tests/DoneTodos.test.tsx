import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DoneTodos from '../Components/DoneTodos';

const mockStore = configureStore([]);

describe('DoneTodos component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      todos: {
        inputValue: '',
        editMode: false,
        todosArray: [],
      },
    });
  });

  test('renders DoneTodos component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DoneTodos />
      </Provider>
    );
    const titleElement = getByText('DoneTodos');
    expect(titleElement).toBeInTheDocument();
  });
});
