/**
 * Toast notification component for user feedback
 * Displays temporary messages for actions and errors
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './EnhancedButton';
import type { Notification, NotificationType } from '../../hooks/useNotifications';

interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const notificationIconsByType: Record<NotificationType, string> = {
  success: '⚔️',
  error: '💀',
  warning: '⚠️',
  info: '📜',
};

const notificationColorsByType: Record<NotificationType, string> = {
  success: 'bg-forest/20 border-forest text-forest',
  error: 'bg-blood/20 border-blood text-blood',
  warning: 'bg-amber/20 border-amber text-amber',
  info: 'bg-crystal/20 border-crystal text-crystal',
};

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const { id, type, message, duration } = notification;

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div
      className={`
      flex items-center justify-between p-4 mb-3 border-2 rounded-lg shadow-lg bg-bronze-texture
      ${notificationColorsByType[type]}
      animate-in slide-in-from-right duration-300
    `}
    >
      <div className="flex items-center">
        <span className="mr-3 text-lg">{notificationIconsByType[type]}</span>
        <span className="text-sm font-frontier font-bold">{message}</span>
      </div>

      <Button
        variant="ghost"
        size="xs"
        onClick={handleClose}
        className="!p-1 !min-h-0 hover:bg-transparent hover:text-parchment-dark font-frontier font-bold"
        aria-label="Close notification"
      >
        ✕
      </Button>
    </div>
  );
};

interface ToastContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  const toastContainer = (
    <div className="fixed top-4 right-4 z-50 w-80 max-w-sm">
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} onClose={onClose} />
      ))}
    </div>
  );

  // Render to portal for proper z-index stacking
  return createPortal(toastContainer, document.body);
};
