import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  description?: string; 
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText = '';
  newTodoDescription = '';
  editingTodo: Todo | null = null;

  ngOnInit() {
    this.loadTodos();
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      if (this.editingTodo) {
        this.editingTodo.text = this.newTodoText.trim();
        this.editingTodo.description = this.newTodoDescription.trim(); 
        this.editingTodo = null;
      } else {
        this.todos.push({
          id: Date.now(),
          text: this.newTodoText.trim(),
          description: this.newTodoDescription.trim() 
        });
      }
      this.newTodoText = '';
      this.newTodoDescription = ''; 
      this.saveTodos();
    }
  }

  editTodo(todo: Todo) {
    this.newTodoText = todo.text;
    this.newTodoDescription = todo.description || ''; 
    this.editingTodo = todo;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  }
}
