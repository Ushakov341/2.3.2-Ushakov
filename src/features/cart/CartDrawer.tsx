import {
  Drawer,
  Group,
  Text,
  Button,
  Divider,
  NumberInput,
  Image,
  Stack,
  ActionIcon,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useCart } from './CartContext';
import { money } from '../../shared/currency';

export function CartDrawer({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { state, setQty, remove, clear, totalPrice } = useCart();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Your cart"
      position="right"
      size="lg"
      padding="md"
    >
      <Stack gap="md">
        {state.items.length === 0 && <Text c="dimmed">Cart is empty</Text>}

        {state.items.map(({ product, qty }) => (
          <Group key={product.id} align="center" wrap="nowrap">
            <Image
              src={product.image}
              alt={product.name}
              w={64}
              h={64}
              radius="md"
            />
            <Stack gap={2} style={{ flex: 1 }}>
              <Text fw={600}>{product.name}</Text>
              <Text size="sm" c="dimmed">
                {money(product.price)}
              </Text>
            </Stack>

            <NumberInput
              aria-label={`qty-${product.id}`}
              min={0}
              value={qty}
              onChange={(v) => setQty(product.id, Number(v) || 0)}
              w={100}
            />
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => remove(product.id)}
              aria-label="remove"
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        ))}

        {state.items.length > 0 && (
          <>
            <Divider />
            <Group justify="space-between">
              <Text fw={700}>Total</Text>
              <Text fw={700}>{money(totalPrice)}</Text>
            </Group>
            <Group justify="space-between">
              <Button variant="light" color="gray" onClick={clear}>
                Clear
              </Button>
              <Button color="leaf">Checkout</Button>
            </Group>
          </>
        )}
      </Stack>
    </Drawer>
  );
}
