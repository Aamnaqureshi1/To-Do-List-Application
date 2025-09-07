import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TodoItem } from "./TodoItem";
import { Plus, CheckCircle2, ListTodo } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Glass morphism container */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <ListTodo className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-white text-3xl mb-2">My Tasks</h1>
          {todos.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-white/90">
                {completedCount} of {todos.length} completed
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-8">
          <Input
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
          />
          <Button 
            onClick={addTodo}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-6"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-white/10 rounded-full w-fit mx-auto mb-4">
                <ListTodo className="w-12 h-12 text-white/60" />
              </div>
              <p className="text-white/70 text-lg">
                No tasks yet. Add one above!
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedCount / todos.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / todos.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}