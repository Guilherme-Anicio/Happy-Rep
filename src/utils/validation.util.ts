export function validateEntity<T>(entity: T, validators: Record<string, (value: any) => void>): void {
    for (const key of Object.keys(validators)) {
      const value = (entity as any)[key];
      if (value) {
        validators[key](value);
      }
    }
  }