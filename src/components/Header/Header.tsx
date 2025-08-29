import { ActionIcon, Badge, Button, Group, Text, UnstyledButton } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import classes from './Header.module.css';

interface HeaderProps {
  cartItemsCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, cartTotal, onCartClick }: HeaderProps) => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Group justify="space-between" w="100%">
          <Group>
            <div className={classes.logo}>
              <Text size="xl" fw={700} c="green.6">
                Vegetable
              </Text>
              <Badge color="green" variant="filled" size="sm">
                SHOP
              </Badge>
            </div>
          </Group>
          
          <UnstyledButton onClick={onCartClick} className={classes.cartButton}>
            <Group gap={8}>
              <div className={classes.cartIcon}>
                <ActionIcon size="lg" variant="filled" color="green.6">
                  <IconShoppingCart size={20} />
                </ActionIcon>
                {cartItemsCount > 0 && (
                  <Badge size="sm" circle className={classes.cartBadge}>
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
              <div>
                <Text size="sm" c="green.6" fw={600}>
                  Cart ${cartTotal.toFixed(2)}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </Group>
      </div>
    </header>
  );
};