import React from "react";
import { View, Text } from "react-native";

interface Props {
  twStyle: any;
  csStyle: any;
}

const UberText: React.FC<Props> = ({
  twStyle,
  csStyle = { fontFamily: " OpenSans_300Light" },
  children,
}) => {
  return <Text style={twStyle ? [twStyle, csStyle] : csStyle}>{children}</Text>;
};

export default UberText;
