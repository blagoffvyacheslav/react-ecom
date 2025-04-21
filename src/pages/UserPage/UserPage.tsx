import React from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@store/UserStore';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import styles from './UserPage.module.scss';

const UserPage = observer(() => {
  const {
    firstName,
    lastName,
    email,
    address: { zip, street, house, apartment },
    setFirstName,
    setLastName,
    setEmail,
    setZip,
    setStreet,
    setHouse,
    setApartment,
    save,
  } = userStore;

  return (
    <div className={styles.blockContainer}>
      <div className={styles.page}>
        <Text tag="h1" view="title" className={styles.pageTitle}>
          User Information
        </Text>

        <div className={styles.cardRow}>
          <div className={styles.card}>
            <Text tag="h2" view="p-20" className={styles.sectionTitle}>
              Personal Info
            </Text>
            <Input
              className={styles.greenInput}
              value={firstName}
              onChange={setFirstName}
              placeholder="First Name"
            />
            <Input
              className={styles.greenInput}
              value={lastName}
              onChange={setLastName}
              placeholder="Last Name"
            />
            <Input
              className={styles.greenInput}
              value={email}
              onChange={setEmail}
              placeholder="Email"
            />
          </div>

          <div className={styles.card}>
            <Text tag="h2" view="p-20" className={styles.sectionTitle}>
              Address
            </Text>
            <Input
              className={styles.greenInput}
              value={zip}
              onChange={setZip}
              placeholder="ZIP Code"
            />
            <Input
              className={styles.greenInput}
              value={street}
              onChange={setStreet}
              placeholder="Street"
            />
            <Input
              className={styles.greenInput}
              value={house}
              onChange={setHouse}
              placeholder="House"
            />
            <Input
              className={styles.greenInput}
              value={apartment}
              onChange={setApartment}
              placeholder="Apartment (optional)"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={save}>Save</Button>
        </div>
      </div>
    </div>
  );
});

export default UserPage;
