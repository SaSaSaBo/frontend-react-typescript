import React, { useState } from 'react';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import TodoList from './components/TodoList';
import InputFeild from './components/InputFeild';
import './App.css';

/*
let name: string;
let age: number | string;
let isStudent: boolean;
let hobbies: string[];
let role: [number, string];

type Person = {
  name: string;
  age: number;
}

// let person: Object; // Person instead of Object;
let person: Person = {
  name: 'SaSa',
  age: 22
  // can't be just name or age
}

let lostOfPeople: Person[];

function  printName(name: string){
  console.log(name);
}

printName('SaSa');

// let printNamem: Function; 
let printNamem: (name: string) => /*void never; // void and never is void returns undefined,but never doesn't return anything

let personName: unknown;

interface Person2 {
  name: string;
  age?: number; 
}

type X = {
  a: string;
  b: number;
}

/*
type Y = {
  c: string;
  d: number;
}


type Y = X & {
  c: string;
  d: number;
}

let y: Y = {
  a: 'hello1',
  b: 123,
  c: 'hello',
  d: 123
}

interface Guy extends Person2 {
  profession: string;
}

// class name1 {
//   constructor(parameters){}
// }

// class name1 extends Person2 {}

*/

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);
  
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);



  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, 
    active = todos, 
    complete = completedTodos;

    if(source.droppableId === 'TodoList') {
      add = active[source.index];
      active.slice(source.index, 1); 
    } else {
      add = complete[source.index];
      complete.slice(source.index, 1);
    }

    if(destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">notebook</span>
        <InputFeild todo = { todo } setTodo = { setTodo } handleAdd = { handleAdd }/>
        <TodoList todos = {todos} setTodos = {setTodos} completedTodos = {completedTodos} setCompletedTodos = {setCompletedTodos} />

      </div>      
    </DragDropContext>

  );
}

export default App;
