import { useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import ToDoForm, { Inputs } from "../forms/todo";
import Loading from "@/components/loading";
import PopupError from "@/components/popup-error";

import {
  createToDo,
  updateToDo,
  deleteToDo,
  ToDoObject,
} from "@/services/todo";

const Wrapper = styled.div`
  padding: 16px;
  margin: 16px 0;
`;

type Props = {
  readonly isOpen: boolean;
  readonly data: ToDoObject | undefined;
  readonly onClose: () => void;
  readonly onCreate: (data: ToDoObject) => void;
  readonly onUpdate: (data: ToDoObject) => void;
  readonly onDelete: (removedId: string) => void;
};

export default function PopupEdit({
  isOpen,
  data,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: Props) {
  const id = data?._id;

  const toast = useRef<Toast>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const defaultValues = useMemo(() => {
    return {
      title: data?.title || "",
      description: data?.description || "",
    };
  }, [data]);

  const showToast = (detail: string, summary: string = "Info") => {
    toast.current?.show({
      severity: "success",
      summary,
      detail,
    });
  };

  const onSubmit = (data: Inputs) => {
    setIsLoading(true);

    if (id) {
      updateToDo(id, data)
        .then((res) => {
          onUpdate(res);
          showToast("Submit success");
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    } else {
      createToDo(data)
        .then((res) => {
          onCreate(res);
          showToast("Submit success");
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  };

  const onClickDelete = () => {
    if (id) {
      setIsLoading(true);
      deleteToDo(id)
        .then((res) => {
          onDelete(res);
          showToast("Remove success");
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <Dialog
        visible={isOpen}
        draggable={false}
        resizable={false}
        onHide={onClose}
        position="center"
      >
        <Wrapper className="flex flex-column align-items-center gap-3">
          <ToDoForm defaultValues={defaultValues} onSubmit={onSubmit} />

          {id && (
            <Button label="Remove" severity="danger" onClick={onClickDelete} className="w-full" />
          )}
        </Wrapper>
      </Dialog>

      <Loading isLoading={isLoading} />
      <PopupError error={error} onClose={() => setError(undefined)} />
      <Toast ref={toast} position="top-left" />
    </>
  );
}
