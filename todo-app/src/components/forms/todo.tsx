"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

export type Inputs = {
  title: string;
  description: string;
};

type Props = {
  readonly defaultValues: Inputs;
  readonly onSubmit: (data: Inputs) => void;
};

export default function ToDoForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({ defaultValues });

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
            htmlFor="title"
            className={classNames({ "p-error": errors.title })}
          ></label>
          <InputText
            value={watch("title")}
            {...register("title", { required: true })}
            className={`w-full ${classNames({ "p-invalid": errors.title })}`}
          />
          <label htmlFor="title">Title</label>
        </span>
        {getFormErrorMessage(errors.title && "Title is required")}
      </div>

      <div className="w-full">
        <span className="p-float-label w-full">
          <label
            htmlFor="description"
            className={classNames({ "p-error": errors.description })}
          ></label>
          <InputTextarea
            value={watch("description")}
            {...register("description", { required: true })}
            className={`w-full ${classNames({
              "p-invalid": errors.description,
            })}`}
            rows={5}
          />
          <label htmlFor="description">Description</label>
        </span>
        {getFormErrorMessage(errors.description && "Description is required")}
      </div>

      <Button label="Save" type="submit" />
    </form>
  );
}
