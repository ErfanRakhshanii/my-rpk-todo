import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import InProgressTodos from '../Components/InProgressTodos';

const mockStore = configureStore([]);

describe('InProgressTodos component', () => {
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

  test('renders InProgressTodos component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <InProgressTodos />
      </Provider>
    );
    const titleElement = getByText('InProgressTodos');
    expect(titleElement).toBeInTheDocument();
  });

});
