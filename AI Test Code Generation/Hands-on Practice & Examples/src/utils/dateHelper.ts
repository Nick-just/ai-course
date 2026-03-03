// ============================================================
// File: src/utils/dateHelper.ts
// Description: Utility for date formatting and manipulation
// ============================================================

import { Logger } from './logger';

const logger = new Logger('DateHelper');

/**
 * Format a date into a readable string (YYYY-MM-DD HH:mm:ss)
 * Returns empty string if date is null/undefined
 *
 * @param date - Date object to format
 * @returns Formatted date string or empty string
 */
export function formatDate(date: Date | null | undefined): string {
  // ✅ FIXED: Guard against null/undefined
  if (!date) {
    logger.warn('formatDate called with null/undefined');
    return '';
  }

  logger.info(`Formatting date: ${date}`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Get formatted current date/time
 *
 * @returns Current date formatted
 */
export function getCurrentDateFormatted(): string {
  const now = new Date();
  return formatDate(now);
}

/**
 * Parse a date string and return formatted result
 * Returns empty string if input is null/undefined or invalid
 *
 * @param dateString - ISO date string (e.g., "2026-03-04")
 * @returns Formatted date or empty string
 */
export function parseAndFormat(
  dateString: string | null | undefined,
): string {
  // ✅ FIXED: Guard against null/undefined
  if (!dateString) {
    logger.warn('parseAndFormat called with null/undefined');
    return '';
  }

  logger.info(`Parsing and formatting: ${dateString}`);
  const date = new Date(dateString);
  return formatDate(date);
}

/**
 * Get the difference between two dates in days
 * Returns 0 if either date is null/undefined
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Days between dates or 0
 */
export function getDaysBetween(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
): number {
  // ✅ FIXED: Guard against null/undefined
  if (!date1 || !date2) {
    logger.warn('getDaysBetween called with null/undefined date');
    return 0;
  }

  const time1 = date1.getTime();
  const time2 = date2.getTime();
  const diffTime = Math.abs(time2 - time1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
