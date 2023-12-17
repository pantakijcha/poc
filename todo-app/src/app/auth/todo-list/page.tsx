"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Loading from "@/components/loading";
import PopupError from "@/components/popup-error";
import ToDoItem from "@/components/todo/item";
import PopupEdit from "@/components/todo/popup-edit";

import useAuthCheck from "@/hooks/use-auth-check";
import { getAllToDos, ToDoObject } from "@/services/todo";

const ItemWrapper = styled.div`
  > div {
    border-bottom: 1px solid var(--bluegray-200);
  }

  > div:last-child {
    border-bottom: unset !important;
  }
`;

export default function TodoListPage() {
  useAuthCheck();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const [toDos, setToDos] = useState<ToDoObject[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<ToDoObject | undefined>();
  const [isOpenEditPopup, setIsOpenEditPopup] = useState<boolean>(false);

  const closeEditPopup = () => {
    setIsOpenEditPopup(false);
    setSelectedToDo(undefined);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllToDos()
      .then((res) => setToDos(res))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Card title="TODO">
        <ItemWrapper className="flex flex-column gap-3">
          <Button
            label="Add"
            onClick={() => setIsOpenEditPopup(true)}
            className="w-full"
          />

          {toDos.map((toDo) => (
            <ToDoItem
              key={toDo._id}
              data={toDo}
              onClick={() => {
                setSelectedToDo(toDo);
                setIsOpenEditPopup(true);
              }}
            />
          ))}
        </ItemWrapper>
      </Card>

      <Loading isLoading={isLoading} />
      <PopupError error={error} onClose={() => setError(undefined)} />
      <PopupEdit
        isOpen={isOpenEditPopup}
        data={selectedToDo}
        onClose={closeEditPopup}
        onCreate={(data: ToDoObject) => {
          closeEditPopup();
          setToDos((prev) => [...prev, data]);
        }}
        onUpdate={(data: ToDoObject) => {
          closeEditPopup();
          setToDos((prev) =>
            [...prev].map((item) => (item._id === data._id ? data : item))
          );
        }}
        onDelete={(removedId: string) => {
          closeEditPopup();
          setToDos((prev) =>
            [...prev].filter((item) => item._id !== removedId)
          );
        }}
      />
    </>
  );
}
