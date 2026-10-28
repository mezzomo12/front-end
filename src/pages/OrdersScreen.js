import { EmptyState } from '../components/ListStates';
import Screen from '../components/Screen';

// Pedidos virão da API; até lá não há pedidos para mostrar.
export default function OrdersScreen() {
  return (
    <Screen>
      <EmptyState message="Você ainda não tem pedidos." />
    </Screen>
  );
}
