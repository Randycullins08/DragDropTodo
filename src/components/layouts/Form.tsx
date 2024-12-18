import { FormEvent, ForwardedRef, forwardRef } from "react";

import { FormProps } from "../../types";

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ onSubmit, children, ...rest }, ref: ForwardedRef<HTMLFormElement>) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit;
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} {...rest}>
        {children}
      </form>
    );
  }
);

export default Form;
