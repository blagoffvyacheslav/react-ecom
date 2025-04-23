import React from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import styles from './CheckoutModal.module.scss';

export type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (address: string, paymentMethod: string) => void;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handleCheckout = () => {
    onCheckout(address, paymentMethod);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Checkout</h2>
        <div>
          <label>Address</label>
          <Input
            type="text"
            value={address}
            onChange={setAddress}
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label>Payment Method</label>
          <Input
            type="text"
            value={paymentMethod}
            onChange={setPaymentMethod}
            placeholder="Enter payment method"
          />
        </div>
        <div className={styles.actions}>
          <Button onClick={handleCheckout}>Confirm</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
