'use client';
import React, { useState, useRef, forwardRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type FieldType = 'text' | 'textarea' | 'dropdown' | 'contact';

interface DragItemProps {
  type: FieldType;
  label: string;
}

interface DropZoneProps {
  onDrop: (item: DragItemProps) => void;
  children: React.ReactNode;
}

interface FormField extends DragItemProps {
  id: number;
  field: string;
}

const DragItem: React.FC<DragItemProps> = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = useRef<HTMLDivElement>(null);
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={`p-2 m-2 border rounded bg-gray-100 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      {label}
    </div>
  );
};

// Use forwardRef to forward the ref correctly to the DropZone component
const DropZone: React.FC<DropZoneProps> = forwardRef<HTMLDivElement, DropZoneProps>(({ onDrop, children }, ref) => {
  const [, drop] = useDrop<DragItemProps, void, unknown>({
    accept: 'field',
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      onDrop(item);
    },
  });

  return (
    <div ref={(node) => {
      drop(node);
      if (typeof ref === 'function') {
        ref(node); // if ref is a function, call it
      } else if (ref) {
        ref.current = node; // if ref is an object, assign it directly
      }
    }} className="min-h-[300px] p-4 border-dashed border-2 border-gray-400 rounded">
      {children}
    </div>
  );
});

DropZone.displayName = 'DropZone'; // Display name for debugging purposes

const DynamicFormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);

  const handleDrop = (item: DragItemProps) => {
    setFields((prev) => [
      ...prev,
      {
        ...item,
        id: prev.length,
        field: `field${prev.length + 1}`,
      },
    ]);
  };

  const handleSave = () => {
    const formConfig = {
      pagename: 'dynamicForm',
      formname: 'Dynamic Form',
      alias: 'dynamicFormAlias',
      tabname: 'Dynamic Form Tab',
      rightsidebarsize: 'md',
      formfields: fields.map((field) => ({
        field: field.field,
        text: field.label,
        type: (() => {
          switch (field.type) {
            case 'text':
              return 'input-text';
            case 'textarea':
              return 'input-textarea';
            case 'dropdown':
              return 'dropdown';
            case 'contact':
              return 'contact-number';
            default:
              return 'input-text';
          }
        })(),
        disabled: false,
        defaultvisibility: true,
        required: true,
        gridsize: 'col-sm-6',
      })),
    };

    console.log('Generated Form JSON:', formConfig);
    alert(JSON.stringify(formConfig, null, 2));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4">
        <div className="w-1/4">
          <h2 className="font-bold">Drag Fields</h2>
          <DragItem type="text" label="Text Field" />
          <DragItem type="textarea" label="Text Area" />
          <DragItem type="dropdown" label="Dropdown" />
          <DragItem type="contact" label="Contact Number" />
        </div>

        <div className="w-3/4">
          <h2 className="font-bold">Form Preview</h2>
          <DropZone onDrop={handleDrop}>
            {fields.map((field) => (
              <div key={field.id} className="p-2 m-2 border rounded">
                <label>{field.label}</label>
                {field.type === 'text' && <input type="text" className="border p-1 w-full" />}
                {field.type === 'textarea' && <textarea className="border p-1 w-full" />}
                {field.type === 'dropdown' && (
                  <select className="border p-1 w-full">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                )}
                {field.type === 'contact' && (
                  <input type="tel" className="border p-1 w-full" placeholder="Contact Number" />
                )}
              </div>
            ))}
          </DropZone>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default DynamicFormBuilder;
