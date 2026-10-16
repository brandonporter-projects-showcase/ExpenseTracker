import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fallbackCategories = [
  "Groceries",
  "Dining Out",
  "Coffee and Snacks",
  "Food Delivery",
  "Public Transport",
  "Taxi and Rideshare",
  "Fuel",
  "Parking",
  "Tolls",
  "Vehicle Maintenance",
  "Vehicle Insurance",
  "Car Payments",
  "Rent",
  "Mortgage",
  "Home Maintenance",
  "Furniture",
  "Household Supplies",
  "Home Security",
  "Electricity",
  "Water",
  "Gas",
  "Internet",
  "Mobile Phone",
  "Waste Collection",
  "Medical",
  "Dental",
  "Vision Care",
  "Pharmacy",
  "Mental Health",
  "Fitness",
  "Clothing",
  "Electronics",
  "Personal Care",
  "Beauty and Cosmetics",
  "Jewelry and Accessories",
  "Movies and Events",
  "Gaming",
  "Hobbies",
  "Books",
  "Sports",
  "Streaming Services",
  "Software Subscriptions",
  "Flights",
  "Hotels",
  "Vacation Activities",
  "Travel Insurance",
  "Tuition",
  "Online Courses",
  "School Supplies",
  "Childcare",
  "Pet Food",
  "Veterinary Care",
  "Pet Supplies",
  "Gifts",
  "Charity",
  "Religious Donations",
  "Life Insurance",
  "Health Insurance",
  "Home Insurance",
  "Credit Card Payments",
  "Loan Payments",
  "Bank Fees",
  "Interest Charges",
  "Income Taxes",
  "Property Taxes",
  "Government Fees",
  "Savings",
  "Investments",
  "Emergency Fund",
  "Business Expenses",
  "Office Supplies",
  "Professional Services",
  "Legal Fees",
  "Other",
];

class AppError extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export function normalizeError(err) {
  const isNetworkError =
    err?.message.includes("Failed to fetch") ||
    err?.message.includes("NetworkError") ||
    err?.message.includes("Load failed") ||
    navigator.onLine === false;
  if (isNetworkError)
    return new AppError(err.message, "network_error", err.status);
  if (err?.message) {
    return new AppError(err.message, err.code, err.status);
  }
  return new AppError("Unknown error occurred", "unknown_error");
}

const DEFAULT_ERROR_MESSAGES = {
  invalid_credentials: "Email or password is incorrect.",
  email_not_confirmed: "Please confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  validation_error: "Please check your input and try again.",
  network_error: "Please check your network connection and try again.",
  unknown_error: "Something went wrong. Please try again.",
  ai_timeout:
    "Category generation timed out. Please pick the category manually from the list.",
  email_exists: "A user with this email address has already been registered.",
  current_password_invalid: "The current password is not correct.",
};

const STATUS_ERROR_MESSAGES = {
  400: "Please check your input and try again.",
  401: "You need to sign in to continue.",
  403: "You do not have permission to do this.",
  404: "The requested resource was not found.",
  409: "This action conflicts with existing data.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Something went wrong on our side. Please try again later.",
};

export function getErrorMessage(error, customMessages = {}) {
  const messages = {
    ...DEFAULT_ERROR_MESSAGES,
    ...customMessages,
  };

  if (error.code && messages[error.code]) {
    return messages[error.code];
  }

  if (error.status && STATUS_ERROR_MESSAGES[error.status]) {
    return STATUS_ERROR_MESSAGES[error.status];
  }

  if (error.message) return error.message;
  return DEFAULT_ERROR_MESSAGES.unknown_error;
}

export function assertOnline() {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw normalizeError({ message: "NetworkError" });
  }
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getDateRange(range) {
  if (!range) return null;
  const now = new Date();
  if (/^\d{4}-\d{2}$/.test(range)) {
    const [year, month] = range.split("-").map(Number);
    return {
      start: new Date(Date.UTC(year, month - 1, 1)).toISOString(),
      end: new Date(Date.UTC(year, month, 1)).toISOString(),
    };
  }
  switch (range) {
    case "thisMonth":
      return {
        start: new Date(
          Date.UTC(now.getFullYear(), now.getMonth(), 1),
        ).toISOString(),
        end: now.toISOString(),
      };
    case "lastMonth":
      return {
        start: new Date(
          Date.UTC(now.getFullYear(), now.getMonth() - 1, 1),
        ).toISOString(),
        end: new Date(
          Date.UTC(now.getFullYear(), now.getMonth(), 1),
        ).toISOString(),
      };
    case "last3Months":
      return {
        start: new Date(
          Date.UTC(now.getFullYear(), now.getMonth() - 3, now.getDate()),
        ).toISOString(),
        end: now.toISOString(),
      };
    default:
      return null;
  }
}
