import {
    ActionIcon,
    Button,
    Drawer,
    Group,
    Image,
    NumberInput,
    Stack,
    Text,
    Title,
    Divider,
    Box,
    Center,
  } from '@mantine/core';
  import { IconMinus, IconPlus, IconTrash, IconShoppingCart } from '@tabler/icons-react';
  import { CartItem } from '../../types/product';
import React from 'react';
  
  interface CartDrawerProps {
    opened: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveItem: (productId: number) => void;
    totalPrice: number;
    onClearCart: () => void;
  }
  
  export const CartDrawer = ({
    opened,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    totalPrice,
    onClearCart,
  }: CartDrawerProps) => {
    if (cartItems.length === 0) {
      return (
        <Drawer opened={opened} onClose={onClose} title="Your Cart" position="right" size="md">
          <Center style={{ minHeight: 200 }}>
            <Stack align="center" gap="md">
              <IconShoppingCart size={48} color="#adb5bd" />
              <Text c="dimmed">Your cart is empty</Text>
              <Text size="sm" c="dimmed" ta="center">
                Browse our fresh vegetables and add some to your cart
              </Text>
            </Stack>
          </Center>
        </Drawer>
      );
    }
  
    return (
      <Drawer opened={opened} onClose={onClose} title="Your Cart" position="right" size="md">
        <Stack gap="md">
          {cartItems.map((item) => (
            <Box key={item.id} p="md" style={{ border: '1px solid #e9ecef', borderRadius: '8px' }}>
              <Group align="flex-start" wrap="nowrap">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  radius="md"
                  fit="cover"
                />
                
                <Stack gap="xs" style={{ flex: 1 }}>
                  <Text fw={500} size="sm">
                    {item.name}
                  </Text>
                  <Text size="sm" c="green.6" fw={600}>
                    ${item.price} each
                  </Text>
                  
                  <Group justify="space-between">
                    <Group gap={4}>
                      <ActionIcon
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.cartQuantity - 1)}
                        disabled={item.cartQuantity <= 1}
                      >
                        <IconMinus size={12} />
                      </ActionIcon>
                      
                      <NumberInput
                        value={item.cartQuantity}
                        onChange={(value) => onUpdateQuantity(item.id, Number(value) || 1)}
                        min={1}
                        max={item.availableCount}
                        size="xs"
                        w={60}
                        styles={{
                          input: { textAlign: 'center', padding: '4px' }
                        }}
                      />
                      
                      <ActionIcon
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.cartQuantity + 1)}
                        disabled={item.cartQuantity >= item.availableCount}
                      >
                        <IconPlus size={12} />
                      </ActionIcon>
                    </Group>
                    
                    <ActionIcon
                      variant="filled"
                      color="red"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <IconTrash size={12} />
                    </ActionIcon>
                  </Group>
                  
                  <Text size="sm" fw={600}>
                    Subtotal: ${(item.price * item.cartQuantity).toFixed(2)}
                  </Text>
                </Stack>
              </Group>
            </Box>
          ))}
  
          <Divider />
  
          <Group justify="space-between">
            <Title order={4}>Total: ${totalPrice.toFixed(2)}</Title>
            <Button variant="outline" color="red" onClick={onClearCart}>
              Clear Cart
            </Button>
          </Group>
  
          <Button size="lg" color="green" fullWidth>
            Proceed to Checkout
          </Button>
        </Stack>
      </Drawer>
    );
  };