import { useState, useEffect } from 'react';

interface ValidationRules {
  [key: string]: (value: any) => boolean;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [isBlinking, setIsBlinking] = useState(false);

  const validateFields = (data: any) => {
    const newInvalidFields = Object.entries(rules)
      .filter(([field, validator]) => !validator(data[field]))
      .map(([field]) => field);

    setInvalidFields(newInvalidFields);
    
    if (newInvalidFields.length > 0) {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        setInvalidFields([]);
      }, 3000);
    }

    return newInvalidFields.length === 0;
  };

  return { invalidFields, isBlinking, validateFields };
}; 