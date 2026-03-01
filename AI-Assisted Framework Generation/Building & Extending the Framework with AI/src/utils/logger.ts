// ============================================================
// File: src/utils/logger.ts
// Description: Lightweight console logger with level and context
// ============================================================

/** Supported log levels ordered by severity. */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Simple contextual logger that prefixes every message with
 * a timestamp and the owning class name.
 */
export class Logger {
  private readonly context: string;
  private readonly minLevel: LogLevel;

  /**
   * @param context  - Typically the class name that owns this logger.
   * @param minLevel - Minimum severity to emit (default: 'info').
   */
  constructor(context: string, minLevel: LogLevel = 'info') {
    this.context = context;
    this.minLevel = minLevel;
  }

  /** Log a debug-level message. */
  debug(message: string): void {
    this.log('debug', message);
  }

  /** Log an info-level message. */
  info(message: string): void {
    this.log('info', message);
  }

  /** Log a warning-level message. */
  warn(message: string): void {
    this.log('warn', message);
  }

  /** Log an error-level message. */
  error(message: string): void {
    this.log('error', message);
  }

  // ── Internal ────────────────────────────────────────────────

  private log(level: LogLevel, message: string): void {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.minLevel]) return;

    const timestamp = new Date().toISOString();
    const tag = level.toUpperCase().padEnd(5);
    console.log(`[${timestamp}] ${tag} [${this.context}] ${message}`);
  }
}
