import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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
};

function Dropdown<TFieldValues extends FieldValues, TNames extends Path<TFieldValues> = Path<TFieldValues>>({
  control,
  name,
  options,
  className,
  helperText,
  label,
  ...textFieldProps
}: DropdownProps<TFieldValues, TNames>) {
  const baseStyles =
    'peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-700 placeholder-shown:border-t-gray-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-700 focus:border-gray-900';
  const errorStyles = 'ring-red-500 text-red-500';

  useScrollDisabled();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          InputProps={{
            className: 'MuiInputBase-input',
          }}
          className={classNames(baseStyles, className, { [errorStyles]: !!fieldState.error })}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? helperText}
          label={label}
          {...textFieldProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

export default Dropdown;
