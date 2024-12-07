import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/hooks/queries/useAuthQuery";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: loginMutation } = useLoginMutation();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      id: "",
      password: "",
    };
    let isValid = true;

    if (!formData.id) {
      newErrors.id = "아이디를 입력해주세요";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await loginMutation(formData);
      alert("로그인이 완료되었습니다.");
      navigate("/profile");
    } catch (error) {
      console.log("로그인 에러:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="아이디"
        name="id"
        value={formData.id}
        onChange={handleChange}
        error={errors.id}
        placeholder="아이디를 입력하세요"
      />
      <Input
        type="password"
        label="비밀번호"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="비밀번호를 입력하세요"
      />
      <Button type="submit">로그인</Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/register")}
      >
        회원가입으로 이동
      </Button>
    </form>
  );
};

export default LoginForm;
