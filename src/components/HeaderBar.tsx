import { Group, Title, ActionIcon, Indicator, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from '../features/cart/CartContext';
import { CartDrawer } from '../features/cart/CartDrawer';
import { money } from '../shared/currency';

export function HeaderBar() {
  const { totalCount, totalPrice } = useCart();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="space-between" h={64} px="md">
        <Title order={3}>
          Vegetable{' '}
          <Text span c="leaf.6">
            Shop
          </Text>
        </Title>

        <Group gap="lg">
          <Text size="sm" c="dimmed">
            Items:{' '}
            <Text span fw={600} c="leaf.7">
              {totalCount}
            </Text>
          </Text>
          <Text size="sm" c="dimmed">
            Total:{' '}
            <Text span fw={700}>
              {money(totalPrice)}
            </Text>
          </Text>

          <Indicator label={totalCount} disabled={totalCount === 0} size={18}>
            <ActionIcon
              size="lg"
              variant="filled"
              color="leaf"
              radius="xl"
              onClick={open}
              aria-label="open cart"
            >
              <IconShoppingCart />
            </ActionIcon>
          </Indicator>
        </Group>
      </Group>

      <CartDrawer opened={opened} onClose={close} />
    </>
  );
}
