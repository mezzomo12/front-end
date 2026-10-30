import { createContext, useContext, useMemo, useState } from 'react';

// Perfil local (em memória, não persistido): por enquanto guarda só a foto escolhida, para que
// ela continue aparecendo ao sair e voltar para Meus Dados. Salvar no servidor depende da API.
const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [photo, setPhoto] = useState(null);
  const value = useMemo(() => ({ photo, setPhoto }), [photo]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile deve ser usado dentro de ProfileProvider.');
  return context;
}
