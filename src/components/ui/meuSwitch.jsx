import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export function MeuSwitch({
    checked,
    onChange,
    label,
    description,
}) {
    return (
        <Field
            orientation="horizontal"
            className="
    inline-flex
    w-fit
    rounded-2xl
    border
    border-fuchsia-blue-200
    bg-fuchsia-blue-50
    p-4
    dark:border-fuchsia-blue-900
    dark:bg-fuchsia-blue-950/30
  "
        >
            <FieldContent>
                <FieldLabel className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    {label}
                </FieldLabel>

                {description && (
                    <FieldDescription className="text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                        {description}
                    </FieldDescription>
                )}
            </FieldContent>

            <Switch
                checked={checked}
                onCheckedChange={onChange}
                className="
          data-[state=checked]:bg-fuchsia-blue-600
          data-[state=unchecked]:bg-fuchsia-blue-300
        "
            />
        </Field>
    );
}