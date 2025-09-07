import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Check } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
      completed 
        ? 'bg-green-500/20 border-green-400/30 backdrop-blur-sm' 
        : 'bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20'
    }`}>
      <div className="relative">
        <Checkbox 
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
        {completed && (
          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5 pointer-events-none" />
        )}
      </div>
      
      <span 
        className={`flex-1 transition-all duration-300 ${
          completed 
            ? 'line-through text-white/60' 
            : 'text-white'
        }`}
      >
        {text}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}