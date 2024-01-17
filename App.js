import { API_URL } from "./config/constants.js";
import avatarImg from "./assets/icons/avatar.png";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";

import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        const products = result.data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.log("error :", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        console.log(banners);
        setBanners(banners);
      })
      .catch((error) => {
        console.log("error :", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel
          data={banners}
          width={Dimensions.get("window").width}
          height={200}
          autoPlay={true}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          itemHeight={200}
          renderItem={(obj) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("배너 클릭");
                }}
              >
                <Image
                  style={styles.bannerImage}
                  source={{ uri: `${API_URL}/${obj.item.imageUrl}` }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.headline}>판매되는 상품들!!</Text>
        <View style={styles.productList}>
          {products.map((product, index) => {
            return (
              <View key={index} style={styles.productCard}>
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
                      <Text style={styles.productSellerName}>
                        {product.seller}
                      </Text>
                    </View>
                    <Text style={styles.productDate}>
                      {dayjs(product.created_at).fromNow()}
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
  headline: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    margin: 10,
  },
  productCard: {
    width: "100%",
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
    fontSize: 14,
  },
  productDate: {
    fontSize: 14,
  },
  productList: {
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    padding: 0,
  },
});
