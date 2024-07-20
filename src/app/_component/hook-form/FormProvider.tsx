import { FormHTMLAttributes } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface IFormProvider extends FormHTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}
export default function FormProvider({
  onSubmit,
  methods,
  ...props
}: IFormProvider) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {props.children}
      </form>
    </Form>
  );
}
