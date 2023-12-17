"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { Card } from "primereact/card";
import LoginForm, { Inputs } from "@/components/forms/login";
import Loading from "@/components/loading";
import PopupError from "@/components/popup-error";

import { getAccessToken } from "@/services/auth";

const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmit = (data: Inputs) => {
    setIsLoading(true);
    getAccessToken(data)
      .then((res) => {
        sessionStorage.setItem("token", res.token);
        router.push(`/auth/todo-list?token=${res.token}`);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="w-full" style={{ height: "90vh" }}>
        <StyledCard title="Todo App">
          <LoginForm onSubmit={onSubmit} />
        </StyledCard>
      </div>

      <Loading isLoading={isLoading} />
      <PopupError error={error} onClose={() => setError(undefined)} />
    </>
  );
}
