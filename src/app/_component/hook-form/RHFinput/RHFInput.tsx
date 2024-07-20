import { useFormContext } from 'react-hook-form';
import { RHFInputWrapper } from './styles';
import React from 'react';
// ----------------------------------------------------------------------

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  loading?: boolean;
  unit?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  description?: string;
  descriptionTop?: string;
}

export default function RHFInput({
  name,
  type,
  placeholder,
  loading,
  maxLength,
  unit,
  required,
  description,
  descriptionTop,
  ...rest
}: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const inputValue = watch(name);

  return (
    <RHFInputWrapper>
      {descriptionTop && (
        <div className="input-form__description-top">{descriptionTop}</div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, { required })}
      />
      {description && (
        <div className="input-form__description">{description}</div>
      )}
    </RHFInputWrapper>
  );
}
