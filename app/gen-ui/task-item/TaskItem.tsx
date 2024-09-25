"use client";

import { useRef, useState } from "react";

export default function TaskItem() {
  const [data, setData] = useState("hello world");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const replaceSelectedText = (selectedText: string): string => {
    return `[${selectedText.toUpperCase()}]`;
  };

  const handleSelectionAndReplace = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd, value } = textarea;
      if (selectionStart !== selectionEnd) {
        const selectedText = value.substring(selectionStart, selectionEnd);

        const replacedText = replaceSelectedText(selectedText);

        const newValue =
          value.substring(0, selectionStart) +
          replacedText +
          value.substring(selectionEnd);

        setData(newValue);
        
        // set cursor to the end of the replaced text
        setTimeout(() => {
          textarea.setSelectionRange(selectionStart + replacedText.length, selectionStart + replacedText.length);
        }, 0);
      }
    }
  };

  return <div>
    <textarea
      ref={textareaRef}
      value={data}
      onChange={(e) => setData(e.target.value)}
      onSelect={handleSelectionAndReplace}
      />
  </div>;
}
