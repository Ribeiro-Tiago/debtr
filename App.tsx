import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, TouchableHighlight, AsyncStorage, StatusBar } from 'react-native';
import dayjs from "dayjs"

interface Item {
  id: number;
  isPaid: boolean;
  desc: string;
  price: number;
}

interface StorageData {
  currMonth: number;
  items: Item[];
}

const key = "MPT_DATA";
export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [currMonth, setCurrMonth] = useState(-1);

  useEffect(() => {
    loadStorage()
  }, [false])

  const loadStorage = async () => {
    const data = JSON.parse(await AsyncStorage.getItem(key)) as StorageData;
    const month = dayjs().month();

    if (!data || !data.items.length) {
      setCurrMonth(month);
      saveToStorage([], month);
      return;
    }

    setCurrMonth(data.currMonth);

    if (data.currMonth !== month) {
      setItems(data.items.map(item => ({ ...item, isPaid: false })));
    } else {
      setItems(data.items);
    }
  }

  const saveToStorage = async (items: Item[], month = currMonth) => {
    await AsyncStorage.setItem(key, JSON.stringify({ items, currMonth: month }));
  }

  const toggleItem = (id: number) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, isPaid: !item.isPaid }
      }

      return item;
    });
    setItems(newItems);
    saveToStorage(newItems).catch(console.error);
  }

  const deleteItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    saveToStorage(newItems).catch(console.error);
    setItems(newItems);
  }

  const getCurrDate = () => {
    return dayjs().format("MMMM YYYY");
  }

  const toggleForm = () => setIsVisible(!isVisible);

  const addItem = () => {
    if (!desc || !price) {
      alert("desc and price required");
      return;
    }

    const newItems = [
      ...items,
      { id: Date.now(), desc, price: Number(price), isPaid: false }
    ];

    setItems(newItems);
    saveToStorage(newItems).catch(console.error);

    setIsVisible(false);
    setDesc("");
    setPrice(null);
  };

  const getLeft = () => {
    return items.reduce((accu, { price, isPaid }) => {
      return (!isPaid)
        ? accu + price
        : accu;
    }, 0)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="default" />

      <View style={styles.topBar}>
        <Text style={styles.text}>Monthly Pay Tracker</Text>
        <Text style={styles.btn} onPress={toggleForm}>+</Text>
      </View>

      {isVisible && <View style={styles.formWrapper}>
        <Text style={styles.formTitle}>Add new item</Text>
        <View style={styles.formContainer}>
          <TextInput style={styles.formInput} value={desc} onChangeText={setDesc} placeholder="Descrição" placeholderTextColor="#000" />
          <TextInput style={styles.formInput} value={price} onChangeText={setPrice} placeholder="Valor" placeholderTextColor="#000" keyboardType="number-pad" />
        </View>

        <TouchableOpacity disabled={!price || !desc} onPress={addItem} style={styles.formBtn}>
          <Text style={styles.textWhite}>Add</Text>
        </TouchableOpacity>
      </View>}

      <View style={styles.header}>
        <Text style={styles.textWhite}>{getCurrDate()}</Text>
        <Text style={styles.textWhite}>{getLeft()}€ left</Text>
      </View>

      <ScrollView>
        {items.map(item => {
          return (
            <TouchableHighlight
              key={item.id}
              style={item.isPaid && styles.itemWrapperDisabled}
              onPress={() => toggleItem(item.id)}
            >
              <View style={styles.itemWrapper}>
                <View style={styles.itemText}>
                  <Text style={styles.textWhite}>{item.desc}</Text>
                  <Text style={styles.textWhite}>{item.price}€</Text>
                </View>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={styles.itemBtn}>&times;</Text>
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          )
        })}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  topBar: {
    marginTop: 27,
    height: 50,
    backgroundColor: '#f9f9f9',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row"
  },
  text: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold"
  },
  btn: {
    fontSize: 48,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10
  },
  header: {
    height: 50,
    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  textWhite: {
    fontSize: 20,
    color: "#f7f7f7",
  },
  itemWrapper: {
    height: 50,
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  itemWrapperDisabled: {
    opacity: .1
  },
  itemText: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 50
  },
  itemBtn: {
    fontSize: 36,
    color: "red",
    fontWeight: "bold",
    marginBottom: 5
  },
  formWrapper: {
    marginTop: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10
  },
  formTitle: {
    fontSize: 24,
    color: "#f7f7f7",
    marginLeft: "5%",
    fontWeight: "bold",
    marginBottom: 15
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  formInput: {
    height: 50,
    backgroundColor: "#afafaf",
    fontSize: 20,
    paddingLeft: 10,
    width: "40%"
  },
  formBtn: {
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: 40,
    marginTop: 20,
    borderRadius: 5
  }
});
