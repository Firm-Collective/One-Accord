import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { MenuItem, FormControl, InputLabel, Select, TextField as MuiTextField } from '@mui/material';
import classNames from 'classnames';
import { useScrollDisabled } from '@/components/hooks';

type ControllerType<TFieldValues extends FieldValues, TNames> = {
  control: Control<TFieldValues>;
  name: TNames;
};

type DropdownProps<TFieldValues extends FieldValues, TNames> = ControllerType<TFieldValues, TNames> & {
  options: { value: string | number; label: string }[];
  className?: string;
  helperText?: string;
  label?: React.ReactNode;
  onSelect?: (value: string | number) => void;
};

function Dropdown<TFieldValues extends FieldValues, TNames extends Path<TFieldValues> = Path<TFieldValues>>({
  control,
  name,
  options,
  className,
  helperText,
  label,
  onSelect,
  ...textFieldProps
}: DropdownProps<TFieldValues, TNames>) {
  useScrollDisabled();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <InputLabel shrink>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            displayEmpty
            {...textFieldProps}
            onChange={(event) => {
              field.onChange(event);
              if (onSelect) {
                onSelect(event.target.value as string | number);
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && (
            <MuiTextField helperText={helperText} error={!!fieldState.error} style={{ display: 'none' }} />
          )}
        </FormControl>
      )}
    />
  );
}

export default Dropdown;
