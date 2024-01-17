import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import BasketballImage from "./assets/products/basketball1.jpeg";
import AvatarImage from "./assets/icons/avatar.png";
import { API_URL } from "./config/constants.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        console.log(result.data.products);
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log("error :", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.HeadLine}>판매되는 상품들</Text>
        <View style={styles.productList}>
          {products.map((item, index) => {
            return (
              <View style={styles.productCard}>
                <View>
                  <Image
                    style={styles.productImage}
                    source={{ uri: `${API_URL}/${item.imageUrl}` }}
                    resizeMode={"contain"}
                  />
                </View>
                <View style={styles.productContent}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <View style={styles.productFooter}>
                    <View style={styles.productSeller}>
                      <Image
                        style={styles.productAvatar}
                        source={AvatarImage}
                      />
                      <Text style={styles.prodcutSellerName}>
                        {item.seller}
                      </Text>
                    </View>
                    <Text style={styles.productDate}>
                      {dayjs(item.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  productContent: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 8,
  },
  prodcutSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
    color: "gray",
  },
  productList: {
    alignItems: "center",
  },
  HeadLine: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 24,
  },
});
