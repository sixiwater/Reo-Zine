import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  className = '', 
  tag: Tag = 'div', 
  multiline = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue.trim() !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value);
    }
  };

  if (isEditing) {
    const commonClasses = "bg-white/90 text-stone-900 border border-blue-400 outline-none rounded shadow-inner w-full resize-none p-1 font-sans";
    
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} ${commonClasses}`}
          rows={4}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} ${commonClasses}`}
      />
    );
  }

  return (
    <Tag 
      onDoubleClick={() => setIsEditing(true)}
      className={`${className} cursor-text hover:bg-black/5 rounded transition-colors duration-200 decoration-dotted decoration-stone-400`}
      title="Double click to edit"
    >
      {value}
    </Tag>
  );
};

export default EditableText;