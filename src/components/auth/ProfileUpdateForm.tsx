import { useState, useRef } from "react";
import { useUpdateProfileMutation } from "@/hooks/queries/useAuthQuery";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuthStore } from "@/store/authStore";
import { ProfileUpdateRequest } from "@/types/auth";

const ProfileUpdateForm = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfileMutation = useUpdateProfileMutation();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: ProfileUpdateRequest = {};
    if (nickname !== user?.nickname) {
      formData.nickname = nickname;
    }

    const fileInput = fileInputRef.current;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      formData.avatar = file;
    }

    try {
      await updateProfileMutation.mutateAsync(formData);
      alert("프로필이 업데이트되었습니다.");
    } catch {
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 파일 선택 시 크기 체크
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      e.target.value = ""; // 파일 선택 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          프로필 이미지 (최대 5MB)
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <Button type="submit" className="w-full">
        프로필 수정
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
