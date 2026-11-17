// app/form-practice/shadcn/page.tsx（丸ごと置き換える）
"use client";
z.enum
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const schema = z.object({
  terms: z.boolean().refine((value) => value === true, {
    error: "利用規約に同意してください",
  }),
  newsletter: z.boolean(),
  plan: z.enum(["free", "pro", "enterprise"], {
    error: "プランを選択してください",
  }),
});

type FormValues = z.infer<typeof schema>;

const plans = [
  { value: "free", label: "Free（個人向け）" },
  { value: "pro", label: "Pro（チーム向け）" },
  {
    value: "enterprise",
    label: "Enterprise（大きな組織向け）",
  },
];

export default function CheckboxRadioForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false, newsletter: false },
  });

  return (
    <div className="mx-auto max-w-md p-8">
      <form
        onSubmit={form.handleSubmit((data) =>
          console.log(data),
        )}
      >
        <FieldGroup>
          <Controller
            name="terms"
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
                  <FieldDescription>
                    利用規約とプライバシーポリシーに同意します。
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            name="newsletter"
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
                  ニュースレターを受け取る
                </FieldLabel>
              </Field>
            )}
          />

          <Controller
            name="plan"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">
                  プラン
                </FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  {plans.map((plan) => (
                    <Field
                      key={plan.value}
                      orientation="horizontal"
                    >
                      <RadioGroupItem
                        value={plan.value}
                        id={`plan-${plan.value}`}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel
                        htmlFor={`plan-${plan.value}`}
                        className="font-normal"
                      >
                        {plan.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />

          <Button type="submit">送信</Button>
        </FieldGroup>
      </form>
    </div>
  );
}