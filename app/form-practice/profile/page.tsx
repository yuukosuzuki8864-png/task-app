// app/form-practice/profile/page.tsx（新規作成）
import { ProfileForm } from "./profile-form";
import type { ProfileFormValues } from "./schema";

export default function ProfilePage() {
  // 実際のアプリでは、データベースから読み込んだ値を使う
  const currentProfile: ProfileFormValues = {
    displayName: "田中太郎",
    bio: "Webエンジニアです。",
    website: "",
    role: "developer",
  };

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">
        プロフィール編集
      </h1>
      <ProfileForm defaultValues={currentProfile} />
    </div>
  );
}