// Utility file for things being displayed on pages

// Receives a JSON object and a filename, and saves the 
// JSON as a file with the given filename.

import React from 'react';
import { HighlightKey } from './pageUtils.styles';

export const renderField = (key, value) => {
  if (value === true || value === false) {
    return value.toString();
  }
  if (key === 'createdAt' || key === 'updatedAt') {
    const date = new Date(value.seconds * 1000);
    return date.toString();
  }
  if (value === null) {
    return 'null';
  }
  if (value && typeof value === 'object') {
    if (Array.isArray(value)) {
      // Handle array recursively
      return (
        <ul>
          {value.map((v, i) => (
            <li key={i}>{renderField(i.toString(), v)}</li>
          ))}
        </ul>
      );
      
    } else {
      // Handle object recursively
      return (
        <ul>
          {Object.keys(value).map((key) => (
            <li key={key}>
              <HighlightKey>{key}:</HighlightKey> {renderField(key, value[key])}
            </li>
          ))}
        </ul>
      );
    }
  }
  return value;  // For primitive types like string, number, boolean, etc.
};