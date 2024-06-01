import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  value: string;
  isDone: boolean;
  inProgress: boolean;
}

interface TodosState {
  todosArray: Todo[];
  inputValue: string;
  editMode: boolean;
  editId: number;
}

const initialState: TodosState = {
  todosArray: [],
  inputValue: "",
  editMode: false,
  editId: 0,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setEditId: (state, action: PayloadAction<number>) => {
      state.editId = action.payload;
    },
    addTodo: (state) => {
      const newTodo: Todo = {
        id: Math.random(),
        value: state.inputValue,
        isDone: false,
        inProgress: true,
      };
      state.todosArray.push(newTodo);
      state.inputValue = "";
    },
    updateTodo: (state) => {
      const todo = state.todosArray.find((todo) => todo.id === state.editId);
      if (todo) {
        todo.value = state.inputValue;
      }
      state.editMode = false;
      state.editId = 0;
      state.inputValue = "";
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todosArray = state.todosArray.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todosArray.find((todo) => todo.id === action.payload);
      if (todo) {
        state.inputValue = todo.value;
        state.editMode = true;
        state.editId = action.payload;
      }
    },
    toggleTodoStatus: (state, action: PayloadAction<number>) => {
      const todo = state.todosArray.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
        todo.inProgress = !todo.inProgress;
      }
    },
    updateTodosOrder: (state, action: PayloadAction<Todo[]>) => {
      state.todosArray = action.payload;
    },
  },
});

export const {
  setInputValue,
  setEditMode,
  setEditId,
  addTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  toggleTodoStatus,
  updateTodosOrder,
} = todosSlice.actions;

export default todosSlice.reducer;
