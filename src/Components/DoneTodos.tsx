import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { updateTodosOrder } from '../Redux/todoSlice';

interface Todo {
  id: number;
  value: string;
  isDone: boolean;
  inProgress: boolean;
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='w-full min-h-16 h-10 flex items-center justify-end gap-5 rounded-md border shadow-xl'>
      {children}
    </div>
  );
}

export default function DoneTodos() {
  const dispatch = useDispatch<AppDispatch>();
  const todosArray = useSelector((state: RootState) => state.todos.todosArray);
  const doneTodos = todosArray.filter((todo) => todo.isDone) as Todo[];
  const [items, setItems] = React.useState<string[]>(doneTodos.map((todo) => todo.id.toString()));

  useEffect(() => {
    setItems(doneTodos.map((todo) => todo.id.toString()));
  }, [doneTodos]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        const newItems = arrayMove(items, oldIndex, newIndex);
        const newOrder = newItems.map((id) => {
          const todo = todosArray.find((todo) => todo.id.toString() === id);
          if (todo) {
            return { ...todo };
          }
          throw new Error('Todo not found');
        });

        dispatch(updateTodosOrder(newOrder));

        return newItems;
      });
    }
  };

  return (
    <div className='w-full h-screen flex justify-center'>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items}>
          <div className='w-4/6 h-3/4 flex flex-col gap-3 rounded-md overflow-y-scroll bg-white shadow-2xl'>
            {items.map((id) => {
              const todo = todosArray.find((todo) => todo.id.toString() === id);
              if (!todo) return null;
              return (
                <SortableItem key={id} id={id}>
                  <span className='w-3/4 text-lg font-medium'>{todo.value}</span>
                  <div className='w-1/5 h-full flex items-center justify-center bg-green-600 duration-500 text-white text-lg font-normal rounded-md'>done</div>
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

