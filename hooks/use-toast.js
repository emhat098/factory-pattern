/**
 * @file use-toast.js
 * @description Implements a custom React hook, `useToast`, to provide a simplified interface for triggering toast notifications globally.
 * The hook utilizes a globally accessible `toasterRef` to interact with the `Toaster` component.
 */

import toasterRef from '../components/toaster';

/**
 * `useToast` Hook
 * @description A custom React hook that provides methods for triggering toast notifications of various types (error, warning, info, success).
 * The hook interacts with the `toasterRef`, which is a reference to the globally accessible `Toaster` component.
 *
 * @returns {Object} An object containing methods to trigger different types of toast notifications.
 * - `error(message: string)`: Triggers an error toast notification.
 * - `warning(message: string)`: Triggers a warning toast notification.
 * - `info(message: string)`: Triggers an informational toast notification.
 * - `success(message: string)`: Triggers a success toast notification.
 *
 * @example
 * const toast = useToast();
 * toast.error("An error occurred!"); // Triggers an error toast notification.
 * toast.success("Operation successful!"); // Triggers a success toast notification.
 */
const useToast = () => {
  return {
    /**
     * Triggers an error toast notification.
     * @param {string} message - The message to display in the error toast.
     */
    error: function (message) {
      toasterRef.current.addToast('error', message);
    },

    /**
     * Triggers a warning toast notification.
     * @param {string} message - The message to display in the warning toast.
     */
    warning: function (message) {
      toasterRef.current.addToast('warning', message);
    },

    /**
     * Triggers an informational toast notification.
     * @param {string} message - The message to display in the informational toast.
     */
    info: function (message) {
      toasterRef.current.addToast('info', message);
    },

    /**
     * Triggers a success toast notification.
     * @param {string} message - The message to display in the success toast.
     */
    success: function (message) {
      toasterRef.current.addToast('success', message);
    },
  };
};

export default useToast;
