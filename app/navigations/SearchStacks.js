import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStacks = createStackNavigator({
  TopRestaurants: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Busca tu Restaurante"
    })
  }
});

export default SearchScreenStacks;
