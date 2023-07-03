import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { headerStyles } from "@/styles/header.js";

export function HeaderBack() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={headerStyles.headerLeft}
    >
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.03 5.78a.75.75 0 10-1.06-1.06l-6.75 6.75a.748.748 0 00-.005 1.055m.005.006l6.75 6.75a.75.75 0 101.06-1.061l-5.47-5.47h14.69a.75.75 0 000-1.5H5.56l5.47-5.47"
          fill="#fff"
        />
      </Svg>
    </TouchableOpacity>
  );
}
