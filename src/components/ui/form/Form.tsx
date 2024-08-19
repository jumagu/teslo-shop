import { FormProvider, UseFormReturn } from "react-hook-form";

interface Props {
  className?: string;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void> | void;
}

export const Form = ({ methods, onSubmit, children, className }: Props) => {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
