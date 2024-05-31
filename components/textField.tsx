import React from 'react';
import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';
import classNames from 'classnames';
import type { TextFieldProps } from '@mui/material/TextField';
import TextFieldMui from '@mui/material/TextField';
import { useScrollDisabled } from '@/components/hooks';

type ControllerType<TFieldValues extends FieldValues, TNames> = {
  control: Control<TFieldValues>;
  name: TNames;
};

type Props<TFieldValues extends FieldValues, TNames> = ControllerType<TFieldValues, TNames> & TextFieldProps;

type ExtendedFieldError = FieldError & {
  birth_year: {
    message?: string;
  };
};

function TextField<TFieldValues extends FieldValues, TNames extends Path<TFieldValues> = Path<TFieldValues>>({
  control,
  name,
  helperText,
  className,
  ...textFieldProps
}: Props<TFieldValues, TNames>) {
  const baseStyles =
    'peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-700 placeholder-shown:border-t-gray-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-700 focus:border-gray-900';
  const errorStyles = 'ring-red-500 text-red-500';

  const { InputLabelProps, ...restTextFieldProps } = textFieldProps;
  useScrollDisabled();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextFieldMui
          {...field}
          InputProps={{
            className: 'MuiInputBase-input',
          }}
          className={baseStyles}
          onChange={(e) => {
            let value: number | string = e.target.value;
            if (e.target.type === 'number') {
              value = parseInt(value);
            }
            if (typeof value === 'number' && isNaN(value)) {
              value = value + '';
            }
            field.onChange(value);
          }}
          error={!!fieldState.error}
          helperText={
            (fieldState.error?.message ?? '') || ((fieldState?.error as ExtendedFieldError)?.birth_year?.message ?? '')
          }
          InputLabelProps={{
            ...InputLabelProps,
            shrink: true,
          }}
          {...restTextFieldProps}
        />
      )}
    />
  );
}

export default TextField;
