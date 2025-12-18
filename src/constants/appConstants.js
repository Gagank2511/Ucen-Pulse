/**
 * Application Constants
 * Centralized configuration for the UCENPulse app
 */

// localStorage keys
export const STORAGE_KEYS = {
  ACTIVITIES: "ucen_activities",
  METRICS: "ucen_metrics",
  DARK_MODE: "ucen_darkMode",
};

// Metric types and their configurations
export const METRIC_TYPES = {
  STEPS: {
    value: "steps",
    label: "Steps",
    icon: "👟",
    goal: 10000,
    unit: "",
    color: "blue",
  },
  WATER: {
    value: "water",
    label: "Water",
    icon: "💧",
    goal: 2.5,
    unit: "L",
    color: "cyan",
  },
  SLEEP: {
    value: "sleep",
    label: "Sleep",
    icon: "😴",
    goal: 8,
    unit: "hrs",
    color: "purple",
  },
  CALORIES: {
    value: "calories",
    label: "Calories",
    icon: "🔥",
    goal: 2000,
    unit: "",
    color: "orange",
  },
};

// Metric options for dropdown
export const METRIC_OPTIONS = [
  { value: "steps", label: "Steps" },
  { value: "water", label: "Water (litres)" },
  { value: "sleep", label: "Sleep (hours)" },
  { value: "calories", label: "Calories" },
];

// Sort options
export const ACTIVITY_SORT_OPTIONS = [
  { value: "date-desc", label: "Date (newest first)" },
  { value: "date-asc", label: "Date (oldest first)" },
  { value: "duration-desc", label: "Duration (longest first)" },
  { value: "duration-asc", label: "Duration (shortest first)" },
];

export const METRIC_SORT_OPTIONS = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
  { value: "value-desc", label: "Highest value" },
  { value: "value-asc", label: "Lowest value" },
];

// Date range configuration
export const DATE_RANGE = {
  MIN: 7,
  MAX: 90,
  DEFAULT: 14,
};

// Display limits
export const DISPLAY_LIMITS = {
  ACTIVITIES: 20,
  METRICS: 20,
  RECENT_ACTIVITIES: 5,
};

// Notification settings
export const NOTIFICATION_DURATION = 3000; // milliseconds

// App metadata
export const APP_INFO = {
  NAME: "UCENPulse",
  SUBTITLE: "Personal Fitness Tracker",
  DESCRIPTION: "Log activities, record health metrics, and visualise trends — client-side only.",
  VERSION: "1.0",
};

