import { useMemo } from "react";
import styled from "styled-components";
import get from "lodash/get";

import { Dialog } from "primereact/dialog";

const Wrapper = styled.div`
  padding: 16px;
  margin: 16px 0;

  > div.code {
    font-size: 28px;
    line-height: 30px;
    font-weight: bold;
  }

  > div.desc {
    font-size: 18px;
    line-height: 20px;
  }
`;

type Props = {
  readonly error: any;
  readonly onClose: () => void;
};

export default function PopupError({ error, onClose }: Props) {
  const { code, desc } = useMemo(() => {
    const code = get(error, "code");
    const desc =
      get(error, "response.data.message") || get(error, "message");

    if (!error) {
      return { code: "", desc: "" };
    }

    if (code === "ERR_NETWORK") {
      return {
        code: code,
        desc: "Please check internet connection.",
      };
    }

    return {
      code: code,
      desc: desc,
    };
  }, [error]);

  return (
    <Dialog
      visible={!!error}
      draggable={false}
      resizable={false}
      onHide={onClose}
      position="center"
    >
      <Wrapper className="flex flex-column align-items-center gap-3">
        <i
          className="pi pi-exclamation-circle"
          style={{ fontSize: "5rem", color: "var(--red-500)" }}
        />
        <div className="code text-center">{code}</div>
        <div className="desc text-center">{desc}</div>
      </Wrapper>
    </Dialog>
  );
}
