const ToastFactory = {
  createToast: function (type, message) {
    const toast = document.createElement('div');

    toast.classList.add('toast');

    switch (type) {
      case 'error':
        toast.classList.add('toast-error');
        break;
      case 'warning':
        toast.classList.add('toast-warning');
        break;
      case 'info':
        toast.classList.add('toast-info');
        break;
      case 'success':
        toast.classList.add('toast-success');
        break;
      default:
        throw new Error(`Unknown toast type: ${type}`);
    }
    toast.textContent = message;
    return toast;
  },
};

function showToast(type, message) {
  const container = document.getElementById('toast-container');

  const toast = ToastFactory.createToast(type, message);

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
