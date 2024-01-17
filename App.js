import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import BasketballImage from "./assets/products/basketball1.jpeg";
import AvatarImage from "./assets/icons/avatar.png";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>판매되는 상품들</Text>
      <View style={styles.productCard}>
        <View>
          <Image
            style={styles.productImage}
            source={BasketballImage}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.productContent}>
          <Text style={styles.productName}>농구공</Text>
          <Text style={styles.productPrice}>50000원</Text>
          <View style={styles.productFooter}>
            <View style={styles.productSeller}>
              <Image style={styles.productAvatar} source={AvatarImage} />
              <Text style={styles.prodcutSellerName}>후누피</Text>
            </View>
            <Text style={styles.productDate}>3분전</Text>
          </View>
        </View>
      </View>
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
});
