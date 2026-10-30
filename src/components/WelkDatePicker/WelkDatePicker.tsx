"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { cn } from "../../utils";
import styles from "./WelkDatePicker.module.css";
import type { WelkDatePickerProps } from "./WelkDatePicker.types";

function dateAt(year: number, month: number, day: number) {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function validDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = dateAt(year, month - 1, day);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    year >= 1 &&
    Number.isFinite(date.getTime()) &&
    iso(date) === value
  );
}

function parse(value: string) {
  if (!validDate(value)) {
    throw new RangeError(
      `WelkDatePicker: invalid date "${value}". Use YYYY-MM-DD.`,
    );
  }
  const [year, month, day] = value.split("-").map(Number);
  return dateAt(year, month - 1, day);
}

const monthLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const dayLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const circlePaths = [
  "M37 5C28 1 11 3 5 13C-1 24 7 36 22 37C36 39 46 30 45 18C44 7 32 2 19 4C8 6 2 16 4 25",
  "M29 4C15 0 3 10 4 22C5 33 17 38 31 35C44 32 47 20 41 11C35 2 18 2 9 10C3 16 3 25 8 30",
  "M40 11C33 1 17 2 8 9C-1 16 2 30 14 35C27 41 43 32 45 22C47 10 36 3 24 4C13 4 5 12 4 20",
  "M18 3C6 5 1 16 5 27C9 38 26 38 37 32C48 25 44 10 33 5C21 0 8 7 5 16C2 24 8 33 17 35",
  "M34 4C22 0 7 6 4 17C0 29 13 38 26 36C40 36 47 24 43 14C39 3 24 1 13 7C5 12 2 21 6 27",
  "M43 16C41 5 27 1 15 5C3 9 0 22 8 31C16 40 33 37 41 29C49 20 42 7 31 4C20 1 8 8 5 17",
] as const;

function circlePath(seed: string) {
  // Stable pseudo-random variation keeps server rendering and hydration in sync.
  let hash = 0;
  for (const character of seed)
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return circlePaths[hash % circlePaths.length];
}

export const DatePickerControl = forwardRef<
  HTMLInputElement,
  WelkDatePickerProps & { popup?: boolean }
>(function DatePickerControl(
  {
    label,
    value,
    defaultValue = "",
    onValueChange,
    name,
    id,
    min,
    max,
    disabled = false,
    required = false,
    circularMarking = false,
    circularMarkingColor = "#d62828",
    showTodaysDate = false,
    className,
    popup = false,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLTableElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const restoringFocus = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const open = expanded && !disabled;
  const close = useCallback(() => {
    setExpanded(false);
    restoringFocus.current = true;
    inputRef.current?.focus();
    restoringFocus.current = false;
  }, []);

  useEffect(() => {
    if (!popup || !open) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      )
        setExpanded(false);
    };
    document.addEventListener("pointerdown", outside);
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [popup, open, close]);
  useImperativeHandle(ref, () => inputRef.current!, []);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const [draft, setDraft] = useState({ text: selected, forValue: selected });
  const text = draft.forValue === selected ? draft.text : selected;
  if (selected) parse(selected);
  if (min) parse(min);
  if (max) parse(max);
  if (min && max && min > max)
    throw new RangeError("WelkDatePicker: min must not be after max.");
  const error =
    text && !validDate(text)
      ? "Enter a valid date in YYYY-MM-DD format."
      : text && min && text < min
        ? `Choose a date on or after ${min}.`
        : text && max && text > max
          ? `Choose a date on or before ${max}.`
          : "";

  useEffect(() => {
    inputRef.current?.setCustomValidity(error);
  }, [error]);
  const now = new Date();
  const today = iso(dateAt(now.getFullYear(), now.getMonth(), now.getDate()));
  const initialMonth = (selected || today).slice(0, 7);
  const [view, setView] = useState({
    month: initialMonth,
    forValue: selected,
  });
  const month = view.forValue === selected ? view.month : initialMonth;
  const first = parse(`${month}-01`);
  const year = first.getUTCFullYear();
  const monthIndex = first.getUTCMonth();
  const count = dateAt(year, monthIndex + 1, 0).getUTCDate();
  const offset = first.getUTCDay();
  const weeks = Math.ceil((offset + count) / 7);
  const previous = dateAt(year, monthIndex - 1, 1);
  const next = dateAt(year, monthIndex + 1, 1);
  const [focusDate, setFocusDate] = useState<{ value: string }>();

  useEffect(() => {
    if (focusDate)
      calendarRef.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${focusDate.value}"]`)
        ?.focus();
  }, [focusDate]);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form || value !== undefined) return;
    const reset = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented) {
          setInternalValue(defaultValue);
          setDraft({ text: defaultValue, forValue: defaultValue });
          setView({
            month: (defaultValue || today).slice(0, 7),
            forValue: defaultValue,
          });
        }
      });
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [value, defaultValue, today]);

  const change = (date: string) => {
    setDraft({ text: date, forValue: selected });
    if (value === undefined) setInternalValue(date);
    onValueChange?.(date);
  };
  const unavailable = (date: string) =>
    disabled || !!(min && date < min) || !!(max && date > max);
  const navigate = (date: Date) =>
    setView({ month: iso(date).slice(0, 7), forValue: selected });
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const steps: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -date.getUTCDay(),
      End: 6 - date.getUTCDay(),
    };
    const step = steps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const target = dateAt(year, monthIndex, date.getUTCDate() + step);
    if (target.getUTCFullYear() < 1 || target.getUTCFullYear() > 9999) return;
    let targetValue = iso(target);
    if (min && targetValue < min) targetValue = min;
    if (max && targetValue > max) targetValue = max;
    navigate(parse(targetValue));
    setFocusDate({ value: targetValue });
  };

  return (
    <div
      ref={rootRef}
      role="group"
      className={cn(styles.picker, popup && styles.field, className)}
      onBlur={(event) => {
        if (popup && !event.currentTarget.contains(event.relatedTarget))
          setExpanded(false);
      }}
    >
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.control}>
        <input
          ref={inputRef}
          id={inputId}
          className={cn(styles.input, popup && styles.withAction)}
          type="text"
          role={popup ? "combobox" : undefined}
          aria-autocomplete={popup ? "none" : undefined}
          name={name}
          value={text}
          placeholder="YYYY-MM-DD"
          aria-describedby={`${inputId}-format${error ? ` ${inputId}-error` : ""}`}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          required={required}
          aria-haspopup={popup ? "dialog" : undefined}
          aria-expanded={popup ? open : undefined}
          aria-controls={popup && open ? `${inputId}-calendar` : undefined}
          onFocus={() => {
            if (popup && !restoringFocus.current) setExpanded(true);
          }}
          onClick={() => {
            if (popup) setExpanded(true);
          }}
          onKeyDown={(event) => {
            if (popup && event.key === "ArrowDown") {
              event.preventDefault();
              setExpanded(true);
              const candidate = selected || today;
              const bounded =
                min && candidate < min
                  ? min
                  : max && candidate > max
                    ? max
                    : candidate;
              navigate(parse(bounded));
              setFocusDate({ value: bounded });
            }
          }}
          onChange={(event) => {
            const nextText = event.target.value;
            setDraft({ text: nextText, forValue: selected });
            if (!nextText || validDate(nextText)) change(nextText);
          }}
        />
        {popup && (
          <button
            type="button"
            className={styles.action}
            aria-label="Open calendar"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? `${inputId}-calendar` : undefined}
            disabled={disabled}
            onClick={() => setExpanded(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M7 2v6m10-6v6M3 11h18m-12 4h2m2 0h2" />
            </svg>
          </button>
        )}
      </div>
      <span id={`${inputId}-format`} className={styles.hint}>
        YYYY-MM-DD
      </span>
      {error && (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {(!popup || open) && (
        <div
          id={`${inputId}-calendar`}
          role={popup ? "dialog" : undefined}
          aria-label={popup ? "Choose a date" : undefined}
          className={popup ? styles.popup : undefined}
        >
          <div className={styles.navigation}>
            <button
              type="button"
              aria-label="Previous month"
              disabled={
                disabled ||
                (year === 1 && monthIndex === 0) ||
                !!(min && iso(dateAt(year, monthIndex, 0)) < min)
              }
              onClick={() => navigate(previous)}
            >
              {"<"}
            </button>
            <span
              id={`${inputId}-month`}
              aria-live="polite"
              className={styles.month}
            >
              {monthLabel.format(first)}
            </span>
            <button
              type="button"
              aria-label="Next month"
              disabled={
                disabled ||
                (year === 9999 && monthIndex === 11) ||
                !!(max && iso(next) > max)
              }
              onClick={() => navigate(next)}
            >
              {">"}
            </button>
          </div>
          <table
            ref={calendarRef}
            className={styles.calendar}
            aria-labelledby={`${inputId}-month`}
          >
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th key={day} scope="col">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: weeks }, (_, week) => (
                <tr key={week}>
                  {Array.from({ length: 7 }, (_, weekday) => {
                    const day = week * 7 + weekday - offset + 1;
                    if (day < 1 || day > count) return <td key={weekday} />;
                    const date = dateAt(year, monthIndex, day);
                    const dateValue = iso(date);
                    return (
                      <td key={weekday}>
                        <button
                          type="button"
                          data-date={dateValue}
                          aria-label={dayLabel.format(date)}
                          aria-pressed={selected === dateValue}
                          aria-current={
                            today === dateValue ? "date" : undefined
                          }
                          disabled={unavailable(dateValue)}
                          onClick={() => {
                            change(dateValue);
                            if (popup) close();
                          }}
                          onKeyDown={(event) => keyDown(event, date)}
                          className={cn(
                            styles.day,
                            circularMarking &&
                              selected === dateValue &&
                              styles.circularDay,
                            showTodaysDate &&
                              today === dateValue &&
                              styles.today,
                          )}
                        >
                          {day}
                          {circularMarking && selected === dateValue && (
                            <svg
                              className={styles.circularMark}
                              style={{ color: circularMarkingColor }}
                              viewBox="0 0 48 40"
                              preserveAspectRatio="none"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d={circlePath(`${inputId}:${dateValue}`)} />
                            </svg>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export const WelkDatePicker = forwardRef<HTMLInputElement, WelkDatePickerProps>(
  function WelkDatePicker(props, ref) {
    return <DatePickerControl {...props} ref={ref} />;
  },
);
