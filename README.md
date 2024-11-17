# Toast Notification System

This repository implements a flexible and extensible Toast Notification System for the Sona project, leveraging the Factory Pattern to dynamically create and manage toast notifications. The design focuses on modularity, reusability, and global accessibility, making it easy to integrate with any React-based application.

### Key Features

- Dynamic Toast Creation: Supports multiple toast types (success, error, info, warning) using the Factory Pattern.
- Global Access: Notifications can be triggered globally via the useToast hook and a toasterRef.
- Customizable: Extensible design allows for additional toast types and custom styling.
- Lightweight and Performant: Uses React Portals for efficient rendering outside the component hierarchy.

### How It Works

The project applies the Factory Pattern to dynamically create toast notifications based on their type. The Factory Pattern ensures:

- Centralized logic for creating toast notifications.
- Clear separation of responsibilities for each toast type.
- Flexibility to add new toast types without affecting the existing system.

### Components

1. Toast:

- Manages the list of active toasts and renders them dynamically using React Portals.
- Exposes the addToast method via a ref for global control.

2. ToastItemFactory:

- Factory component that dynamically determines which toast component (SuccessToast, ErrorToast, etc.) to render based on the type.

3. SuccessToast, ErrorToast, InfoToast, WarningToast:

- Individual components encapsulating the styles and behavior of specific toast types.

4. useToast:

- A custom hook providing methods (success, error, info, warning) for triggering notifications globally.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/factory-pattern.git
cd factory-pattern
npm install
```

## Usage

1. Add the Toast Component

- Render the Toast component at the root level of your application, typically in App.js or index.js:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '@/components/toast';

const App = () => {
  return (
    <div>
      <h1>Welcome to Sona Toast Notifications</h1>
    </div>
  );
};

// Render Toast globally
ReactDOM.render(
  <>
    <App />
    <Toast />
  </>,
  document.getElementById('root')
);
```

2. Trigger Toast Notifications with useToast

- Use the useToast hook to trigger toast notifications:

```jsx
import useToast from '@/hooks/use-toast';

const MyComponent = () => {
  const toast = useToast();

  const showSuccess = () => toast.success('Operation successful!');
  const showError = () => toast.error('An error occurred.');

  return (
    <div>
      <button onClick={showSuccess}>Show Success Toast</button>
      <button onClick={showError}>Show Error Toast</button>
    </div>
  );
};

export default MyComponent;
```

## File Structure

```bash
src/
├── components/
│   ├── toast.js          # Manages toast notifications globally.
│   ├── toaster.js        # Global reference for triggering notifications.
│   ├── toast-item.js     # Factory Pattern implementation for toast components.
│   ├── success-toast.js  # Component for success notifications.
│   ├── error-toast.js    # Component for error notifications.
│   ├── info-toast.js     # Component for info notifications.
│   ├── warning-toast.js  # Component for warning notifications.
├── hooks/
│   ├── use-toast.js      # Hook for triggering toast notifications.
└── util/
    ├── cn.js             # Utility for merging class names.
```

## Extending the System

To add a new toast type, follow these steps:

1. Create a New Toast Component:

```jsx
const NeutralToast = ({ message, style }) => (
  <li
    className='mb-2 px-4 py-2 rounded shadow-lg text-white w-80 bg-gray-500'
    style={style}
  >
    {message}
  </li>
);

export default NeutralToast;
```

2. Update the Factory:

- Add a case for the new toast type in ToastItemFactory:

```jsx
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
    case 'neutral':
      return <NeutralToast message={message} style={style} />;
    default:
      return null;
  }
};
```

3 Update the hooks:

- Add a case for the new toast neutral in hook:

```jsx
const useToast = () => {
    // ...
    neutral: function (message) {
        toasterRef.current.addToast('neutral', message);
    },
}
```

4. Use the New Toast Type:

- Trigger the new toast type using the useToast hook:

```jsx
toast.neutral('This is a neutral message.');
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for new features or bug fixes.

## Acknowledgments

- Inspired by the Factory Pattern for modular design.
- Built with React and Tailwind CSS for rapid development and beautiful UI.
