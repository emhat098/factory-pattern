/**
 * @file toaster.js
 * @description This file defines a `Toaster` component using React and Next.js that provides a global reference to a `Toast` component for managing toast notifications. It leverages `React.createRef` for global access and dynamic imports for optimized client-side rendering.
 */

'use client'; // Indicates that this file is intended for client-side rendering in Next.js.

import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Dynamically imports the `Toast` component.
 * - The `ssr: false` option disables server-side rendering for this component,
 *   ensuring it only renders on the client.
 */
const Toast = dynamic(() => import('./toast'), {
  ssr: false, // Disable SSR for the Toast component.
});

/**
 * A global reference to the `Toast` component.
 * - This `toaster` reference is exported and can be used to interact with the `Toast` component
 *   from anywhere in the application.
 */
const toaster = React.createRef();

/**
 * `Toaster` Component
 * - Renders the dynamically imported `Toast` component and assigns it to the `toaster` ref.
 * - This component is typically rendered once in the application, enabling centralized control
 *   of toast notifications.
 *
 * @returns {JSX.Element} The `Toast` component wrapped with a React ref.
 */
export const Toaster = () => <Toast ref={toaster} />;

export default toaster;
