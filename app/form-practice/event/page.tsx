// app/form-practice/event/page.tsx（新規作成）
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventSchema,
  type EventFormValues,
} from "./schema";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function EventForm() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      isOnline: false,
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: EventFormValues) => {
    console.log("送信データ:", data);
  };

  return (
    <div className="mx-auto max-w-md p-8">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* テキスト入力 */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  イベントタイトル
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="例: React勉強会 #1"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* テキストエリア */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  説明
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="イベントの詳細を入力してください"
                />
                <FieldDescription>
                  任意。500文字以内。
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Select */}
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  カテゴリ
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
                    <SelectValue
                      placeholder="カテゴリを選択"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">
                      カンファレンス
                    </SelectItem>
                    <SelectItem value="workshop">
                      ワークショップ
                    </SelectItem>
                    <SelectItem value="meetup">
                      ミートアップ
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* RadioGroup */}
          <Controller
            name="visibility"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">
                  公開設定
                </FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="public"
                      id="visibility-public"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel
                      htmlFor="visibility-public"
                      className="font-normal"
                    >
                      公開
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="private"
                      id="visibility-private"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel
                      htmlFor="visibility-private"
                      className="font-normal"
                    >
                      非公開
                    </FieldLabel>
                  </Field>
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />

          {/* Checkbox */}
          <Controller
            name="isOnline"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>
                  オンライン開催
                </FieldLabel>
              </Field>
            )}
          />

          <Controller
            name="agreeToTerms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
              >
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>
                    利用規約に同意する
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <Button type="submit">イベントを作成</Button>
        </FieldGroup>
      </form>
    </div>
  );
}