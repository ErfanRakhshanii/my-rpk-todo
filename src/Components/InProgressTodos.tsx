
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { toggleTodoStatus } from '../Redux/todoSlice';

export default function InProgressTodos() {
  const dispatch = useDispatch<AppDispatch>();
  const todosArray = useSelector((state: RootState) => state.todos.todosArray);

  const handleToggleStatus = (id: number) => {
    dispatch(toggleTodoStatus(id));
  };



  const inProgressTodos = todosArray.filter((todo) => todo.inProgress);

  return (
    <div className='w-full h-screen flex justify-center '>
      <div className='w-4/6 h-3/4 flex flex-col gap-3 rounded-md overflow-y-scroll bg-white shadow-2xl'>
        {inProgressTodos.map((todo) => (
          <div key={todo.id} className='w-full min-h-16 h-10 flex items-center justify-end gap-5 rounded-md border shadow-xl'>
            <span className='w-3/4 text-lg font-medium'>{todo.value}</span>
            <input
              className='w-1/6 h-full rounded-md'
              type='checkbox'
              checked={todo.isDone}
              onChange={() => handleToggleStatus(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
