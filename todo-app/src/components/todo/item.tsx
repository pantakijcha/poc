import styled from "styled-components";
import { DateTime } from "luxon";

import { ToDoObject } from "@/services/todo";
import { useMemo } from "react";

const Container = styled.div`
  padding: 16px;
  &:hover {
    background-color: var(--bluegray-50);
  }
`;

type Props = {
  readonly data?: ToDoObject;
  readonly onClick: () => void;
};

export default function ToDoItem({ data, onClick }: Props) {
  const { dateDisplay, timeDisplay } = useMemo(() => {
    const updateAt = DateTime.fromISO(data?.updatedAt || "");
    return {
      dateDisplay: updateAt.toFormat("d LLL"),
      timeDisplay: updateAt.toFormat("H:mm"),
    };
  }, [data]);

  return (
    <Container onClick={onClick} className="flex flex-row align-items-center gap-3">
      <div className="flex flex-none">
        <i className="pi pi-thumbs-up-fill" style={{ fontSize: '2.5rem' }} />
      </div>
      <div className="flex flex-grow-1">
        <div className="flex flex-column gap-1">
          <div className="font-bold">{data?.title}</div>
          <div>{data?.description}</div>
        </div>
      </div>
      <div className="flex flex-none" style={{ maxWidth: "150px" }}>
        <div className="flex flex-column gap-1 align-items-end">
          <div className="font-bold">{dateDisplay}</div>
          <div>{timeDisplay}</div>
        </div>
      </div>
    </Container>
  );
}
