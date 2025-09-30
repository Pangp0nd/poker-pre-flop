'use client';

import PasswordProtection from '@/components/PasswordProtection';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <PasswordProtection>
      {children}
    </PasswordProtection>
  );
};

export default ClientWrapper;