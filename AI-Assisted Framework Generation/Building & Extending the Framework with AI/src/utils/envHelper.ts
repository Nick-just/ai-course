// ============================================================
// File: src/utils/envHelper.ts
// Description: Type-safe accessor for environment variables
// ============================================================

/**
 * Provides typed, validated access to environment variables
 * with optional default values.
 */
export class EnvHelper {
  /**
   * Return the value of an environment variable.
   * Throws if the variable is not set and no default is provided.
   *
   * @param key          - Environment variable name.
   * @param defaultValue - Fallback when the variable is not set.
   */
  get(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;
    if (value === undefined) {
      throw new Error(`Environment variable "${key}" is not set and no default was provided.`);
    }
    return value;
  }

  /**
   * Return an environment variable parsed as a number.
   *
   * @param key          - Environment variable name.
   * @param defaultValue - Fallback numeric value.
   */
  getNumber(key: string, defaultValue?: number): number {
    const raw = process.env[key];
    if (raw !== undefined) {
      const parsed = Number(raw);
      if (Number.isNaN(parsed)) {
        throw new Error(`Environment variable "${key}" is not a valid number: "${raw}"`);
      }
      return parsed;
    }
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable "${key}" is not set and no default was provided.`);
  }

  /**
   * Return an environment variable parsed as a boolean.
   * Truthy values: "true", "1", "yes" (case-insensitive).
   *
   * @param key          - Environment variable name.
   * @param defaultValue - Fallback boolean value.
   */
  getBoolean(key: string, defaultValue?: boolean): boolean {
    const raw = process.env[key];
    if (raw !== undefined) {
      return ['true', '1', 'yes'].includes(raw.toLowerCase());
    }
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable "${key}" is not set and no default was provided.`);
  }

  /** Check whether an environment variable is defined. */
  has(key: string): boolean {
    return process.env[key] !== undefined;
  }
}
