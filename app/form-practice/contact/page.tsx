// app/form-practice/contact/page.tsx（新規作成）
import { ContactForm } from "./contact-form";

export default function ContactPracticePage() {
  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">
        お問い合わせ（練習）
      </h1>
      <ContactForm />
    </div>
  );
}