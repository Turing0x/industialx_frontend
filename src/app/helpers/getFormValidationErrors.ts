import { FormGroup, ValidationErrors } from "@angular/forms";

export function getFormValidationErrors(form: FormGroup) {
  const result: object[] = [];
  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors | null = form.get(key)!.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          'control': key,
          'error': keyError,
          'value': controlErrors[keyError]
        });
      });
    }
  });

  return result;
}