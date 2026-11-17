// app/form-practice/profile/profile-form.tsx（新規作成）
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormValues,
} from "./schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  defaultValues: ProfileFormValues;
};

export function ProfileForm({ defaultValues }: Props) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // 保存のかわりに1秒待ち、ブラウザのコンソールに出す
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );
    console.log("保存する内容:", data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="displayName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                表示名
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                ほかのユーザーに表示される名前です。
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                自己紹介
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="自己紹介を入力してください"
                className="resize-none"
              />
              <FieldDescription>
                任意。200文字以内。
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Webサイト
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://example.com"
              />
              <FieldDescription>
                任意。空欄のままでも保存できます。
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                役割
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="役割を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">
                    開発者
                  </SelectItem>
                  <SelectItem value="designer">
                    デザイナー
                  </SelectItem>
                  <SelectItem value="manager">
                    マネージャー
                  </SelectItem>
                  <SelectItem value="other">
                    その他
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "保存中..."
            : "保存する"}
        </Button>
      </FieldGroup>
    </form>
  );
}