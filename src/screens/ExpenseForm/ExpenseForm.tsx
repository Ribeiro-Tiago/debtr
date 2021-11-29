import React, {useEffect, useContext, useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {useForm} from "react-hook-form";
import Snackbar from "react-native-snackbar";
import {useNavigation} from "@react-navigation/native";

import {Item} from "../../types";
import {
  FormItem,
  MonthSelector,
  NotificationController,
  TopBar,
} from "../../components";

import {i18nContext} from "../../contexts/i18n";
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
  remove: (id: string, notifId?: string) => void;
  undoRemoval: (params: RemoveItemParams) => void;
  hideForRemoval: (params: RemoveItemParams) => void;
}

interface Form {
  description: string;
  amount: number;
  name: string;
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
  hideForRemoval,
  undoRemoval,
}: Props) {
  const initialValues = {
    description: item && item.description,
    amount: item && item.amount,
  };
  const {i18n} = useContext(i18nContext);
  const {goBack} = useNavigation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>({
    defaultValues: initialValues,
    reValidateMode: "onBlur",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const isNew = !item;

  useEffect(() => {
    register("description", {required: true});
    register("amount", {required: true});
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
          ...(item.notification && {
            notification: {
              id: item.notification.id,
              date: pickerDate,
            },
          }),
        },
        oldAmount: initialValues.amount,
        oldNotif: item.notification,
        notifTexts,
      });
    }

    goBack();
  };

  const onDelete = () => {
    let removalTimeout: NodeJS.Timeout = null;
    const {id, months, amount, notification} = item;

    hideForRemoval({id, months, amount});

    removalTimeout = setTimeout(() => {
      remove(id, notification?.id);
    }, 6000);

    Snackbar.show({
      text: i18n.snackbarDeletedText,
      duration: 5000,
      action: {
        text: i18n.undo,
        onPress: () => {
          clearTimeout(removalTimeout);

          undoRemoval({id, months, amount});
        },
      },
    });

    goBack();
  };

  const renderTopBar = () => {
    return (
      <TopBar
        title={isNew ? i18n.createExpenseTitle : i18n.updateExpenseTitle}
        hasBackButton={true}
      />
    );
  };

  // TODO: add indication that the button is clicked
  // TODO: make button disabled if errors or as soon as it's clicked to avoid multiple creation
  const renderButtons = () => {
    const style = isPickerVisible
      ? [styles.buttonWrapper, {opacity: 0, zIndex: -1}]
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
              onChange={(val: string) =>
                setValue("description", val, {shouldValidate: true})
              }
              initialValue={item && item.description}
            />

            <FormItem
              label={i18n.amount}
              error={i18n.amountErr}
              placeholder={i18n.amountPlaceholder}
              hasErr={!!errors.amount}
              keyboard="numeric"
              onChange={(val: any) =>
                setValue("amount", val, {shouldValidate: true})
              }
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
  title: {
    fontSize: 18,
    color: "#581c0c",
    textAlign: "center",
  },
});
