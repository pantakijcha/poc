import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {
  readonly isLoading: boolean;
};

const LoadingBackDrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(174, 174, 174, 0.5);

  > div {
    padding: 16px;
    background-color: white;
    border: 1px solid var(--bluegray-200);
    border-radius: 16px;
  }
`;

export default function Loading({ isLoading }: Props) {
  return (
    isLoading && (
      <LoadingBackDrop className="flex flex-row align-items-center justify-content-center">
        <div>
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      </LoadingBackDrop>
    )
  );
}
