import { useEffect } from 'react';

export const useScrollDisabled = () => {
  useEffect(() => {
    document.addEventListener('wheel', function (_event) {
      const focusNumberInput = document.querySelector('input.MuiInputBase-input[type=number]:focus');
      if (focusNumberInput) {
        const val = focusNumberInput as HTMLElement;
        val.blur();
      }
    });

    return () => {
      document.removeEventListener('wheel', () => {});
    };
  }, []);
};
