import React from "react";
import { API_URL } from "../config/constants.js";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import avatarImg from "../assets/icons/avatar.png";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function ProductCard(props) {
  const product = props.product;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Product", { id: product.id });
      }}
    >
      <View style={styles.productCard}>
        {product.soldout === 1 && <View style={styles.productBlur} />}
        <View>
          <Image
            style={styles.productImg}
            source={{
              url: `${API_URL}/${product.imageUrl}`,
            }}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.productContents}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <View style={styles.productFooter}>
            <View style={styles.productSeller}>
              <Image style={styles.productAvatar} source={avatarImg} />
              <Text style={styles.productSellerName}>{product.seller}</Text>
            </View>
            <Text style={styles.productDate}>
              {dayjs(product.created_at).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  productCard: {
    width: 300,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },
  productImg: {
    width: "100%",
    height: 210,
  },
  productContents: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
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
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productList: {
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
