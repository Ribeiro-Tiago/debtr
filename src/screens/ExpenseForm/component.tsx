import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import { Item, Month, ItemCreation } from "../../types";
import { TopBar, FormItem, MonthSelector } from "../../components";
import { getPlatformIcon } from "../../utils";

interface Props {
  item: Item | null;
  selectedMonths: Month[];
  create: (item: ItemCreation) => void;
  update: (item: Item, amount: number) => void;
  remove: (id: string, months: Month[], amount: number) => void;
}

interface Form {
  description: string;
  amount: number;
}

export default function ExpenseForm({
  selectedMonths,
  item,
  create,
  update,
  remove,
}: Props) {
  const initialValues = {
    description: item && item.description,
    amount: item && item.amount,
  };
  const { goBack } = useNavigation();
  const { register, setValue, handleSubmit, errors } = useForm<Form>({
    defaultValues: initialValues,
    reValidateMode: "onBlur",
  });
  const isNew = !item;

  useEffect(() => {
    register({ name: "description" }, { required: true });
    register({ name: "amount" }, { required: true });
  }, [register]);

  const onSubmit = (data: Form) => {
    if (isNew) {
      create({ ...data, months: selectedMonths });
    } else {
      update(
        { ...item, ...data, months: selectedMonths },
        initialValues.amount,
      );
    }

    goBack();
  };

  const onDeleteConfirm = () => {
    remove(item.id, item.months, item.amount);
    goBack();
  };

  const onDelete = () => {
    Alert.alert(
      "Confirm delete?",
      "You are about to delete this expense. This action is irreversable",
      [{ text: "Confirm", onPress: onDeleteConfirm }, { text: "Cancel" }],
      { cancelable: true },
    );
  };

  const renderTopBar = () => {
    return (
      <TopBar>
        <View style={styles.topbarContainer}>
          <TouchableWithoutFeedback onPress={goBack}>
            <View style={styles.goBackWrapper}>
              <Icon
                name={getPlatformIcon("arrow-back")}
                color="#581c0c"
                size={24}
              />
              <Text style={styles.goBackText}>Back</Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.title}>
            {isNew ? "New expense" : "Updating expense"}
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        enabled
        keyboardVerticalOffset={0}>
        <ScrollView style={styles.wrapper}>
          <FormItem
            label="Description"
            error="Description is required"
            placeholder="E.g.: Netflix"
            hasErr={!!errors.description}
            onChange={(val: string) => setValue("description", val, true)}
            initialValue={item && item.description}
          />

          <FormItem
            label="Amount"
            error="Amount must be a valid number"
            placeholder="E.g.: 14 (Just a number)"
            hasErr={!!errors.amount}
            keyboard="numeric"
            onChange={(val: any) => setValue("amount", val, true)}
            initialValue={item && item.amount.toString()}
          />

          <MonthSelector />

          {renderButtons()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.wrapper}>
      {renderTopBar()}

      {renderForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonDelete: {
    color: "red",
    marginTop: 30,
    fontSize: 16,
  },
  buttonSubmit: {
    color: "#ca5116",
    borderWidth: 1,
    borderColor: "#ca5116",
    borderRadius: 10,
    fontSize: 18,
    width: "70%",
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginVertical: 30,
    display: "flex",
    alignItems: "center",
  },
  topbarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  goBackWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 0,
  },
  goBackText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#581c0c",
  },
  title: {
    fontSize: 18,
    color: "#581c0c",
    textAlign: "center",
  },
});
