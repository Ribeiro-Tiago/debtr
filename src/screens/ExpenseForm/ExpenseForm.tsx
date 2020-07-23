import React, { useEffect, useContext, useState } from "react";
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

import { Item } from "../../types";
import {
  TopBar,
  FormItem,
  MonthSelector,
  NotificationController,
} from "../../components";
import { getPlatformIcon } from "../../utils";
import { i18nContext } from "../../contexts/i18n";
import {
  CreateItemParams,
  RemoveItemParams,
  UpdateItemParams,
} from "../../types/item";

interface Props {
  item: Item | null;
  selectedMonths: number[];
  isPickerVisible: boolean;
  pickerDate: Date;
  isNotifEnabled: boolean;
  create: (params: CreateItemParams) => void;
  update: (params: UpdateItemParams) => void;
  remove: (params: RemoveItemParams) => void;
}

interface Form {
  description: string;
  amount: number;
}

// TODO: fill correct notif values on item edit
// TODO: make notifs work again
export default function ExpenseForm({
  selectedMonths,
  item,
  isPickerVisible,
  pickerDate,
  isNotifEnabled,
  create,
  update,
  remove,
}: Props) {
  const initialValues = {
    description: item && item.description,
    amount: item && item.amount,
  };
  const { i18n } = useContext(i18nContext);
  const { goBack } = useNavigation();
  const { register, setValue, handleSubmit, errors } = useForm<Form>({
    defaultValues: initialValues,
    reValidateMode: "onBlur",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const isNew = !item;

  useEffect(() => {
    register({ name: "description" }, { required: true });
    register({ name: "amount" }, { required: true });
  }, [register]);

  const onSubmit = (data: Form) => {
    if (isSubmitting) {
      return;
    }

    setSubmitting(true);

    const notifTexts = {
      title: i18n.getNotifTitle,
      message: i18n.getNotifDesc(data.description),
    };

    if (isNew) {
      create({
        item: {
          ...data,
          months: selectedMonths,
          ...(isNotifEnabled && {
            notification: {
              id: Math.pow(2, 30).toString(),
              date: pickerDate,
            },
          }),
        },
        notifTexts,
      });
    } else {
      update({
        item: {
          ...item,
          ...data,
          months: selectedMonths,
          notification: {
            id: item.notification.id,
            date: pickerDate,
          },
        },
        oldAmount: initialValues.amount,
        oldNotif: item.notification,
        notifTexts,
      });
    }

    goBack();
  };

  const onDeleteConfirm = () => {
    remove({
      id: item.id,
      months: item.months,
      amount: item.amount,
      notifId: item.notification?.id,
    });
    goBack();
  };

  const onDelete = () => {
    Alert.alert(
      i18n.confirmDeleteTitle,
      i18n.confirmDeleteDesc,
      [{ text: i18n.confirm, onPress: onDeleteConfirm }, { text: i18n.cancel }],
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
              <Text style={styles.goBackText}>{i18n.back}</Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.title}>
            {isNew ? i18n.createExpenseTitle : i18n.updateExpenseTitle}
          </Text>
        </View>
      </TopBar>
    );
  };

  // TODO: add indication that the button is clicked
  // TODO: make button disabled if errors or as soon as it's clicked to avoid multiple creation
  const renderButtons = () => {
    const style = isPickerVisible
      ? [styles.buttonWrapper, { opacity: 0, zIndex: -1 }]
      : styles.buttonWrapper;
    return (
      <View style={style}>
        <Text
          style={styles.buttonSubmit}
          onPress={() => !isSubmitting && handleSubmit(onSubmit)()}>
          {i18n.submit}
        </Text>

        {!isNew && (
          <Text
            style={styles.buttonDelete}
            onPress={() => !isSubmitting && onDelete()}>
            {i18n.delete}
          </Text>
        )}
      </View>
    );
  };

  const renderForm = () => {
    return (
      <>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          enabled
          keyboardVerticalOffset={0}>
          <ScrollView style={styles.wrapper}>
            <FormItem
              label={i18n.description}
              error={i18n.descriptionErr}
              placeholder={i18n.descriptionPlaceholder}
              hasErr={!!errors.description}
              onChange={(val: string) => setValue("description", val, true)}
              initialValue={item && item.description}
            />

            <FormItem
              label={i18n.amount}
              error={i18n.amountErr}
              placeholder={i18n.amountPlaceholder}
              hasErr={!!errors.amount}
              keyboard="numeric"
              onChange={(val: any) => setValue("amount", val, true)}
              initialValue={item && item.amount.toString()}
            />

            <MonthSelector />

            <NotificationController initSwitchValue={!!item?.notification} />

            {renderButtons()}
          </ScrollView>
        </KeyboardAvoidingView>
      </>
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
