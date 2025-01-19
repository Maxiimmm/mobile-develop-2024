import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const SecondScreen = () => {
  const [counter, setCounter] = useState(0);
  const [check, setChek] = useState(0);
  const [word, setWord] = useState("");
  const number = 50;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError('Не удалось загрузить данные'); 
        } finally {
            setLoading(false); 
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    if (counter > number) {
      setWord("Число меньше");
    } else if (counter < number) {
      setWord("Число больше");
    } else setWord("Вы угадали");
  }, [counter]);
  const [fontLoaded] = useFonts({
    Monts: require("../assets/fonts/Montserrat-Medium.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  if (!fontLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <View style={styles.main}>
      <Text style={styles.number}>{counter}</Text>
      <Text style={styles.text}>{word}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            if (counter != 100) {
              setCounter(counter + 10);
            }
          }}
        >
          <Text style={styles.commonText}>+10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            setCounter(0);
          }}
        >
          <Text style={styles.commonText}>Очистить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            if (counter != 0) {
              setCounter(counter - 10);
            }
          }}
        >
          <Text style={styles.commonText}>-10</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => {
          setChek(check + 1);
        }}
      >
        <Text style={styles.commonText}>Проверить</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
            />
        </View>
    </View>
  );
};
const random = () => {
  return Math.floor(Math.floor(Math.random() * 100) / 10) * 10;
};

const styles = StyleSheet.create({
  checkButton: {
    marginTop: 14,
    width: 118,
    height: 43,
    backgroundColor: "#283618",
    justifyContent: "center",
    borderRadius: 4,
  },
  main: {
    backgroundColor: "#606C38",
    alignItems: "center",
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 18,
  },
  number: {
    fontFamily: "Monts",
    marginTop: 111,
    fontSize: 50,
    fontweight: 500,
    fontsize: 45,
    lineHeight: 53,
    color: "#FEFAE0",
  },
  commonButton: {
    marginTop: 97,
    justifyContent: "center",
    borderRadius: 4,
    width: 80,
    height: 43,
    backgroundColor: "#283618",
  },
  text: {
    fontFamily: "Monts",
    marginTop: 28,
    fontStyle: "normal",
    fontSize: 25,
    color: "#FEFAE0",
  },
  commonText: {
    fontFamily: "Monts",
    fontStyle: "normal",
    fontSize: 14,
    textAlign: "center",
    color: "#FEFAE0",
  },
  center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 18,
    },
    item: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
      flex: 1,
      padding: 16,
  },
});

export default SecondScreen;
