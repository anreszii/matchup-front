import { useState, useEffect, Component } from "react";
import { Text as NativeText } from "react-native";
import { useSelector } from "react-redux"

const fonts = ["base-400", "base-500", "base-600", "base-700"];
function getFontWeight(style) {
  const tempStyle = style;
  if (tempStyle && Array.isArray(tempStyle)) {
    return (tempStyle || [])
      .find((el) => el?.fontWeight);
  } else {
    return tempStyle?.fontWeight;
  }
}

export function Text({ children, ...props }) {
  const isFontsLoaded = useSelector((state) => state.layout.isFontsLoaded);
  function getFontFamily(style) {
    if (!isFontsLoaded) {
      return "";
    }
    const fontWeight = getFontWeight(style);
    if (fonts.includes(`base-${fontWeight}`)) {
      return `base-${fontWeight}`;
    } else {
      return "base-400";
    }
  }

  const defaultStyle = {
    color: "#fff",
  };

  const [style, setStyle] = useState([
    {
      ...defaultStyle,
      fontFamily: getFontFamily(),
    },
    props.style,
  ]);

  useEffect(() => {
    if (!isFontsLoaded) {
      return;
    }
    setStyle([
      {
        ...defaultStyle,
        fontFamily: getFontFamily(),
      },
      props.style,
    ]);
  }, [isFontsLoaded, props.style]);

  return (
    <NativeText
      {...props}
      style={style}
    >
      {children}
    </NativeText>
  );
}

export class TextComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Text {...this.props} />;
  }
}
