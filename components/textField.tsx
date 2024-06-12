import React from 'react';
import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';
import classNames from 'classnames';
import type { TextFieldProps } from '@mui/material/TextField';
import TextFieldMui from '@mui/material/TextField';
import { useScrollDisabled } from '@/components/hooks';
import {
  CircularProgress,
} from "@mui/material";

type ControllerType<TFieldValues extends FieldValues, TNames> = {
  control: Control<TFieldValues>;
  name: TNames;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

type Props<TFieldValues extends FieldValues, TNames> = ControllerType<TFieldValues, TNames> & TextFieldProps & {
  isMultiline?: boolean
  isLoading?: boolean

};

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
  isMultiline,
  isLoading,
  onChange, 
  onBlur,
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
          multiline={isMultiline}
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
            onChange && onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          error={!!fieldState.error}
          helperText={
            (fieldState.error?.message ?? "") ||
            ((fieldState?.error as ExtendedFieldError)?.birth_year?.message ?? '')
          }
          InputLabelProps={{
            ...InputLabelProps,
            shrink: true,
          }}
          InputProps={{
            ...textFieldProps.InputProps,
            color: "primary",
            sx: {
              display: "flex",
              alignItems: "center",
            },
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      position: 'absolute',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'linear-gradient(180deg, rgb(242,163,116) 0%, rgb(154,191,228) 28.5%, rgb(237,147,133) 52.5%, rgb(241,162,117) 68%, rgb(239,159,123) 78%, rgb(236,136,132) 91%)',
                    }} />
                    <CircularProgress size={20} style={{ color: 'transparent' }} />
                  </div>
                ) : null}
                {textFieldProps.InputProps?.endAdornment}
              </React.Fragment>
            ),
          }}
          {...restTextFieldProps}
        />
      )}
    />
  );
}

export default TextField;
