/**
 * @file toast.js
 * @description Implements a Toast notification system in React using a global reference (`ref`) and the Factory Pattern.
 * The component dynamically manages and renders toast notifications through React Portals.
 */

'use client'; // Indicates that this file is for client-side rendering in Next.js.

import cn from '@/util/cn'; // Utility function for conditional class merging.
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * `Toast` Component
 * @description Manages a list of toast notifications and renders them dynamically using React Portals.
 * The component exposes an `addToast` method via a `ref` for adding toast notifications from anywhere in the app.
 *
 * @uses Factory Pattern: Each toast notification is treated as an object created dynamically with properties like `type`, `message`, and `id`.
 */
const Toast = forwardRef((_, ref) => {
  const [toasts, setToasts] = useState([]); // State to manage the list of toast notifications.

  /**
   * Exposes the `addToast` method to the parent component or global reference.
   * @method addToast
   * @param {string} type - The type of the toast (e.g., 'success', 'error', 'info', 'warning').
   * @param {string} message - The message to be displayed in the toast.
   *
   * @uses Factory Pattern: Dynamically creates a new toast object with properties like `type` and `message`.
   */
  useImperativeHandle(ref, () => ({
    addToast(type, message) {
      const id = Date.now(); // Unique ID for each toast.
      setToasts((prev) => [...prev, { id, type, message }]); // Dynamically adds the new toast.
    },
  }));

  /**
   * Automatically removes the oldest toast after 3 seconds.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prev) => prev.slice(1)); // Remove the first toast in the queue.
    }, 3000);

    return () => clearInterval(timer); // Clean up the timer on unmount.
  }, []);

  /**
   * Renders the toast notifications as a portal into the DOM's `body`.
   */
  return createPortal(
    <ul className='fixed top-4 right-4 z-50'>
      {toasts.map((toast, index) => (
        <ToastItemFactory key={toast.id} index={index} {...toast} />
      ))}
    </ul>,
    document.body
  );
});

Toast.displayName = 'Toast';

/**
 * `ToastItem` Component
 * @description Represents an individual toast notification.
 * @param {string} type - The type of the toast (e.g., 'success', 'error', 'info', 'warning').
 * @param {string} message - The message to be displayed in the toast.
 * @param {number} index - The index of the toast in the list (used for positioning).
 */
const ToastItem = ({ type, message, index }) => {
  /**
   * Dynamically generates the class names for the toast based on its type.
   * @uses Factory Pattern: The type determines the specific styling of the toast.
   */
  const toastClass = cn('mb-2 px-4 py-2 rounded shadow-lg text-white w-80');

  return (
    <li className={toastClass} style={{ top: `${index * 0.25}rem` }}>
      {message}
    </li>
  );
};

ToastItem.displayName = 'ToastItem';

const ToastItemFactory = ({ type, message, index }) => {
  const style = { top: `${index * 0.25}rem` };

  switch (type) {
    case 'success':
      return <SuccessToast message={message} style={style} />;
    case 'error':
      return <ErrorToast message={message} style={style} />;
    case 'info':
      return <InfoToast message={message} style={style} />;
    case 'warning':
      return <WarningToast message={message} style={style} />;
    default:
      return null;
  }
};

const SuccessToast = ({ message, style }) => (
  <li
    className='mb-2 px-4 py-2 rounded shadow-lg text-white w-80 bg-green-500'
    style={style}
  >
    {message}
  </li>
);

const ErrorToast = ({ message, style }) => (
  <li
    className='mb-2 px-4 py-2 rounded shadow-lg text-white w-80 bg-red-500'
    style={style}
  >
    {message}
  </li>
);

const InfoToast = ({ message, style }) => (
  <li
    className='mb-2 px-4 py-2 rounded shadow-lg text-white w-80 bg-blue-500'
    style={style}
  >
    {message}
  </li>
);

const WarningToast = ({ message, style }) => (
  <li
    className='mb-2 px-4 py-2 rounded shadow-lg text-black w-80 bg-orange-500'
    style={style}
  >
    {message}
  </li>
);

export default Toast;
