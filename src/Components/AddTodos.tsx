import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import {
  setInputValue,
  addTodo,
  updateTodo,
  deleteTodo,
  editTodo,
} from '../Redux/todoSlice';

export default function AddTodos() {
  const inputValue = useSelector((state: RootState) => state.todos.inputValue);
  const editMode = useSelector((state: RootState) => state.todos.editMode);
  const todosArray = useSelector((state: RootState) => state.todos.todosArray);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      return;
    }
    if (editMode) {
      dispatch(updateTodo());
    } else {
      dispatch(addTodo());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='w-3/4 h-4/5 flex flex-col items-center gap-5'>
        <input
          type='text'
          maxLength={70}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => dispatch(setInputValue(e.target.value))}
          placeholder='Add new todos'
          className='relative pl-4 w-11/12 h-[10%] rounded-md font-bold text-lg outline-none shadow-inner'
        />
        <button
          onClick={handleSubmit}
          className='absolute right-32 w-32 h-16 bg-[#388e3c] text-white text-lg font-medium duration-500 hover:border hover:border-[#388e3c] hover:bg-white hover:text-[#388e3c] rounded-md md:right-48'
        >
          {editMode ? 'edit' : 'submit'}
        </button>
        <div className='w-11/12 h-4/5 flex flex-col gap-3 rounded-md overflow-y-scroll bg-white shadow-2xl'>
          {todosArray.map((todo) => (
            <div
              key={todo.id}
              className='w-full min-h-16 h-10 flex items-center justify-end gap-5 rounded-md border shadow-xl'
            >
              <span className='w-3/4 text-lg font-medium'>{todo.value}</span>
              <div className='w-1/5 h-full flex justify-between'>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className='w-[45%] h-full bg-red-600 duration-500 text-white text-base font-normal rounded-md hover:bg-white hover:border hover:border-red-600 hover:text-red-600 md:text-lg '
                >
                  delete
                </button>
                <button
                  onClick={() => dispatch(editTodo(todo.id))}
                  className=' w-[45%] h-full  bg-blue-600 duration-500 text-white text-base font-normal rounded-md hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 md:text-lg '
                >
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
