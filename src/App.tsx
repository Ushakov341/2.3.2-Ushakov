import { AppShell, Container } from '@mantine/core';
import { HeaderBar } from './components/HeaderBar';
import { CatalogPage } from './pages/CatalogPage';
import { CartProvider } from './features/cart/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppShell header={{ height: 64 }} padding="md">
        <AppShell.Header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <HeaderBar />
        </AppShell.Header>

        <AppShell.Main>
          <Container size="xl">
            <CatalogPage />
          </Container>
        </AppShell.Main>
      </AppShell>
    </CartProvider>
  );
}
