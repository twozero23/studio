
"use client";
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface ArrayManagerProps<T extends { id: string }> {
  items: T[];
  setItems: (newItems: T[]) => void; // Changed to expect the full new array
  renderItem: (item: T, index: number, onChange: (index: number, updatedItem: Partial<T>) => void, onMoveUp: (index: number) => void, onMoveDown: (index: number) => void) => React.ReactNode;
  generateNewItem: () => T;
  itemTypeName: string;
}

export function ArrayManager<T extends { id: string }>({
  items,
  setItems,
  renderItem,
  generateNewItem,
  itemTypeName,
}: ArrayManagerProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddItem = useCallback(() => {
    const newItem = generateNewItem();
    const currentItems = items || [];
    const newItemsArray = [...currentItems, newItem];
    setItems(newItemsArray);
    setEditingIndex(newItemsArray.length - 1); // Open editor for the new item
  }, [generateNewItem, setItems, items]);

  const handleRemoveItem = useCallback((index: number) => {
    const currentItems = items || [];
    const newItemsArray = currentItems.filter((_, i) => i !== index);
    setItems(newItemsArray);
    setEditingIndex(currentEditingIndex => {
      if (currentEditingIndex === index) {
        return null;
      } else if (currentEditingIndex !== null && currentEditingIndex > index) {
        return currentEditingIndex - 1;
      }
      return currentEditingIndex;
    });
  }, [setItems, items]);

  const handleItemChange = useCallback((index: number, updatedItemPartial: Partial<T>) => {
    const currentItems = items || [];
    const newItemsArray = [...currentItems];
    newItemsArray[index] = { ...newItemsArray[index], ...updatedItemPartial };
    setItems(newItemsArray);
  }, [setItems, items]);
  
  const handleMoveItem = useCallback((index: number, direction: 'up' | 'down') => {
    const currentItems = items || [];
    if (currentItems.length === 0) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentItems.length - 1) return;

    const newItemsArray = [...currentItems];
    const itemToMove = newItemsArray[index];
    if (direction === 'up') {
      newItemsArray[index] = newItemsArray[index - 1];
      newItemsArray[index - 1] = itemToMove;
    } else { // down
      newItemsArray[index] = newItemsArray[index + 1];
      newItemsArray[index + 1] = itemToMove;
    }
    setItems(newItemsArray);
    
    // Adjust editingIndex if the moved item or its swap partner was being edited
    setEditingIndex(currentEditingIndex => {
      if (currentEditingIndex === index) {
        return direction === 'up' ? index - 1 : index + 1;
      } else if (currentEditingIndex === (direction === 'up' ? index - 1 : index + 1)) {
        return index;
      }
      return currentEditingIndex;
    });
  }, [setItems, items]);


  return (
    <div className="space-y-4">
      {(items || []).map((item, index) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">
                {itemTypeName} {index + 1}
                {(item as any).role && ` - ${(item as any).role}`}
                {(item as any).name && ` - ${(item as any).name}`}
                {(item as any).degree && ` - ${(item as any).degree}`}
                {(item as any).title && ` - ${(item as any).title}`}
              </h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleMoveItem(index, 'up')} disabled={index === 0} aria-label="Move up">
                  <ChevronUp className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => handleMoveItem(index, 'down')} disabled={index === (items || []).length - 1} aria-label="Move down">
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditingIndex(editingIndex === index ? null : index)}>
                  <Edit2 className="h-4 w-4 mr-1" /> {editingIndex === index ? 'Collapse' : 'Edit'}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(index)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            </div>
            {editingIndex === index && (
              <div className="mt-4 pt-4 border-t">
                {renderItem(item, index, handleItemChange, () => handleMoveItem(index, 'up'), () => handleMoveItem(index, 'down'))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleAddItem} variant="outline">
        <PlusCircle className="h-4 w-4 mr-2" /> Add New {itemTypeName}
      </Button>
    </div>
  );
}

interface StringListManagerProps {
  list: string[];
  setList: (newList: string[]) => void;
  label: string; 
}

const StringListManagerInternal: React.FC<StringListManagerProps> = ({ list, setList, label }) => {
  const handleAddString = useCallback(() => setList([...(list || []), '']), [list, setList]);
  
  const handleRemoveString = useCallback((index: number) => setList((list || []).filter((_, i) => i !== index)), [list, setList]);
  
  const handleStringChange = useCallback((index: number, value: string) => {
    const newList = [...(list || [])];
    newList[index] = value;
    setList(newList);
  }, [list, setList]);

  return (
    <div className="space-y-2">
      {(list || []).map((str, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            type="text"
            value={str}
            onChange={(e) => handleStringChange(index, e.target.value)}
            placeholder={`${label} ${index + 1}`}
            className="flex-grow bg-background"
          />
          <Button variant="ghost" size="icon" onClick={() => handleRemoveString(index)} aria-label={`Remove ${label}`}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={handleAddString}>
        <PlusCircle className="h-4 w-4 mr-2" /> Add {label}
      </Button>
    </div>
  );
};
export const StringListManager = React.memo(StringListManagerInternal);

