import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddTodos from '../Components/AddTodos';

const mockStore = configureStore([]);

describe('AddTodos component', () => {
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

  test('renders AddTodos component', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddTodos />
      </Provider>
    );
    const inputElement = getByPlaceholderText('Add new todos');
    expect(inputElement).toBeInTheDocument();
  });
});
