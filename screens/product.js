import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import axios from "axios";
import { API_URL } from "../config/constants";
import AvatarImage from "../assets/icons/avatar.png";
import dayjs from "dayjs";
import ProductCard from "../components/productCard";
export default function ProductScreen(props) {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        const product = result.data.product;
        setProduct(product);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
    axios
      .get(`${API_URL}/products/${id}/recommendation`)
      .then((result) => {
        console.log("추천상품 :", result.data.products);
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log("추천상품에러", error);
      });
  }, [id]);
  const onPressButton = () => {
    if (product.soldout !== 1) {
      Alert.alert("구매가 완료되었습니다.");
      axios
        .post(`${API_URL}/purchase/${id}`)
        .then((result) => {
          console.log("결과 :", result);
        })
        .catch((error) => {
          console.log("error :", error);
        });
    }
  };
  if (!product) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Image style={styles.avatarImage} source={AvatarImage} />
            <Text>{product.seller}</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}원</Text>
            <Text style={styles.productDate}>
              {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
            </Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.recommendationHeadLine}>추천상품</Text>
          <View style={styles.recommendationBox}>
            {products.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  navigation={props.navigation}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onPressButton}>
        <View
          style={
            product.soldout === 1
              ? styles.purchaseDisabled
              : styles.purchaseButton
          }
        >
          <Text style={styles.purchaseButtonText}>
            {product.soldout === 1 ? "구매완료" : "구매하기"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  productSection: {
    padding: 8,
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#e9ecef",
    height: 1,
    marginVertical: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 400,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 8,
  },
  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "rgb(204,204,204)",
  },
  productDescription: {
    marginTop: 16,
    fontSize: 16,
    marginBottom: 32,
  },
  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgb(255,80,88)",
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  recommendationBox: {
    alignItems: "center",
    marginTop: 16,
    paddingBottom: 70,
  },
  recommendationHeadLine: {
    fontSize: 30,
  },
});
