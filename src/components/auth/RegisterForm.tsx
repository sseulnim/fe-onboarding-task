import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/hooks/queries/useAuthQuery";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerMutation } = useRegisterMutation();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      id: "",
      password: "",
      nickname: "",
    };
    let isValid = true;

    if (!formData.id) {
      newErrors.id = "아이디를 입력해주세요";
      isValid = false;
    } else if (formData.id.length < 4) {
      newErrors.id = "아이디는 4자 이상이어야 합니다";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다";
      isValid = false;
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await registerMutation(formData);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch {
      alert("회원가입에 실패했습니다.");
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
      <Input
        label="닉네임"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        error={errors.nickname}
        placeholder="닉네임을 입력하세요"
      />
      <Button type="submit">회원가입</Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/login")}
      >
        로그인으로 이동
      </Button>
    </form>
  );
};

export default RegisterForm;
