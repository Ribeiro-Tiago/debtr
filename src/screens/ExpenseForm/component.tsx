import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Item, Month, ItemCreation } from '../../types';
import { TopBar, FormItem, MonthSelector } from '../../components';

interface Props {
  isNew: boolean;
  item: Item | null;
  selectedMonths: Month[];
  create: (item: ItemCreation) => void;
  update: (item: Item) => void;
  remove: (id: string) => void;
}

interface Form {
  description: string;
  amount: number;
}

export default function ExpenseForm({
  isNew,
  selectedMonths,
  item,
  create,
  update,
  remove,
}: Props) {
  const { goBack } = useNavigation();
  const { register, setValue, handleSubmit, errors } = useForm<Form>();

  useEffect(() => {
    register({ name: 'description' }, { required: true });
    register({ name: 'amount' }, { required: true });
  }, [register]);

  const onSubmit = (data: Form) => {
    if (isNew) {
      create({ ...data, months: selectedMonths });
    } else {
      update({ ...item, ...data, months: selectedMonths });
    }

    goBack();
  };

  const onDeleteConfirm = () => {
    remove(item.id);
    goBack();
  };

  const onDelete = () => {
    Alert.alert(
      'Confirm delete?',
      'You are about to delete this expense. This action is irreversable',
      [{ text: 'Confirm', onPress: onDeleteConfirm }, { text: 'Cancel' }],
      { cancelable: true }
    );
  };

  const renderTopBar = () => {
    return (
      <TopBar>
        <View style={styles.topbarContainer}>
          <TouchableWithoutFeedback onPress={goBack}>
            <View style={styles.goBackWrapper}>
              <Icon
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`}
                color="#581c0c"
                size={24}
              />
              <Text style={styles.goBackText}>Back</Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.title}>
            {isNew ? 'New expense' : 'Updating expense'}
          </Text>
        </View>
      </TopBar>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonSubmit} onPress={handleSubmit(onSubmit)}>
          Submit
        </Text>

        {!isNew && (
          <Text style={styles.buttonDelete} onPress={onDelete}>
            Delete
          </Text>
        )}
      </View>
    );
  };

  const renderForm = () => {
    return (
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <FormItem
          label="Description"
          error="Description is required"
          placeholder="E.g.: Netflix"
          hasErr={!!errors.description}
          onChange={(val: string) => setValue('description', val, true)}
        />

        <FormItem
          label="Amount"
          error="Amount is required"
          placeholder="E.g.: 14"
          hasErr={!!errors.amount}
          keyboard="numeric"
          onChange={(val: number) => setValue('amount', val, true)}
        />

        <MonthSelector />

        {renderButtons()}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderTopBar()}

      {renderForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDelete: {
    color: 'red',
    marginTop: 30,
    fontSize: 16,
  },
  buttonSubmit: {
    color: '#ca5116',
    borderWidth: 1,
    borderColor: '#ca5116',
    borderRadius: 10,
    fontSize: 18,
    width: '70%',
    textAlign: 'center',
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
  },
  topbarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
  },
  goBackText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#581c0c',
  },
  title: {
    fontSize: 18,
    color: '#581c0c',
    textAlign: 'center',
  },
});
