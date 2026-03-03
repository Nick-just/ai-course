// ============================================================
// File: tests/unit/dateHelper.spec.ts
// Description: Unit tests for date utility (Exercise 5 fix)
// ============================================================

import { test, expect } from '@playwright/test';
import {
  formatDate,
  getCurrentDateFormatted,
  parseAndFormat,
  getDaysBetween,
} from '../../src/utils/dateHelper';

test.describe('DateHelper Utility', () => {
  test('should format valid date', () => {
    // Valid date
    const date = new Date('2026-03-04T10:30:45');
    const result = formatDate(date);

    expect(result).toBe('2026-03-04 10:30:45');
  });

  test('should return empty string for null/undefined date', () => {
    // ✅ FIXED: No longer throws
    const nullResult = formatDate(null);
    expect(nullResult).toBe('');

    const undefinedResult = formatDate(undefined);
    expect(undefinedResult).toBe('');
  });

  test('should get current date formatted', () => {
    const result = getCurrentDateFormatted();

    // Should match pattern: YYYY-MM-DD HH:mm:ss
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  });

  test('should parse and format date string', () => {
    const result = parseAndFormat('2026-03-04');

    expect(result).toContain('2026-03-04');
  });

  test('should return empty string for null/undefined date string', () => {
    // ✅ FIXED: No longer throws
    const nullResult = parseAndFormat(null);
    expect(nullResult).toBe('');

    const undefinedResult = parseAndFormat(undefined);
    expect(undefinedResult).toBe('');
  });

  test('should calculate days between two dates', () => {
    const date1 = new Date('2026-03-04');
    const date2 = new Date('2026-03-11');

    const result = getDaysBetween(date1, date2);

    expect(result).toBe(7);
  });

  test('should return 0 for null/undefined dates', () => {
    // ✅ FIXED: No longer throws
    const date = new Date('2026-03-04');

    const nullResult1 = getDaysBetween(null, date);
    expect(nullResult1).toBe(0);

    const nullResult2 = getDaysBetween(date, undefined);
    expect(nullResult2).toBe(0);

    const nullResult3 = getDaysBetween(null, undefined);
    expect(nullResult3).toBe(0);
  });

  test('should handle same date (0 days difference)', () => {
    const date = new Date('2026-03-04');

    const result = getDaysBetween(date, date);

    expect(result).toBe(0);
  });
});
