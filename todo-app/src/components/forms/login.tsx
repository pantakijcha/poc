"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export type Inputs = {
  username: string;
  password: string;
};

type Props = {
  readonly onSubmit: (data: Inputs) => void;
};

export default function LoginForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const validate: SubmitHandler<Inputs> = (data) => {
    onSubmit(data);
    reset();
  };

  const getFormErrorMessage = (message: any) => {
    return <small className="p-error">{message}&nbsp;</small>;
  };

  return (
    <form onSubmit={handleSubmit(validate)} className="flex flex-column gap-3">
      <div className="w-full">
        <span className="p-float-label w-full">
          <label
            htmlFor="username"
            className={classNames({ "p-error": errors.username })}
          ></label>
          <InputText
            {...register("username", { required: true })}
            className={`w-full ${classNames({ "p-invalid": errors.username })}`}
          />
          <label htmlFor="username">Username</label>
        </span>
        {getFormErrorMessage(errors.username && "Username is required")}
      </div>

      <div className="w-full">
        <span className="p-float-label w-full">
          <label
            htmlFor="password"
            className={classNames({ "p-error": errors.password })}
          ></label>
          <InputText
            {...register("password", { required: true })}
            type="password"
            className={`w-full ${classNames({ "p-invalid": errors.password })}`}
          />
          <label htmlFor="password">Password</label>
        </span>
        {getFormErrorMessage(errors.password && "Password is required")}
      </div>

      <Button label="Sign In" type="submit" />
    </form>
  );
}
