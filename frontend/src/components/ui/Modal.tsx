import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'default' | 'large';
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'default',
  footer 
}) => {
  const modalContentClass = size === 'large'
    ? 'w-full max-w-4xl mx-4 max-h-[90vh] bg-parchment rounded-lg border-4 border-bronze bg-metal-texture relative flex flex-col'
    : 'w-full max-w-lg mx-4 max-h-[90vh] bg-parchment rounded-lg border-4 border-bronze bg-metal-texture relative flex flex-col';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={modalContentClass}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 lg:p-6 border-b-2 border-bronze bg-bronze-texture">
              <h2 className="text-lg lg:text-xl font-frontier font-bold text-on-bronze pr-4">{title}</h2>
              <button
                className="text-bronze hover:text-ember text-2xl leading-none font-bold focus:outline-none flex-shrink-0 hover:animate-battle-shake"
                onClick={onClose}
              >
                ⚔
              </button>
            </div>
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto text-iron-dark font-parchment">
              {children}
            </div>
            {footer && (
              <div className="flex flex-col sm:flex-row gap-3 p-4 lg:p-6 border-t-2 border-bronze bg-iron/20 rounded-b-lg">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
