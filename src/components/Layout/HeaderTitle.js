import { Text } from "ui/Text.js";
import { headerStyles } from "@/styles/header.js";

export function HeaderTitle({ title }) {
  return (
    <Text style={headerStyles.headerTitle}>{title}</Text>
  );
}
