import { Controller, useFormContext } from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

type FormTextFieldProps = TextFieldProps & {
  name: string;
};

export const FormTextField = ({ name, ...props }: FormTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          value={(field.value as string) ?? ''} // Ensure controlled input
        />
      )}
    />
  );
};
