import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppError } from './types/type.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendError = (message: string) => {
  const error = new Error(message) as AppError;
  error.status = 400;
  throw error;
}
