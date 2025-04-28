import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const MyStyle = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },

  wisdomContainer: {
    backgroundColor: "#fefefee0",
    borderRadius: 12,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  wisdomContent: {
    fontSize: 20,
    lineHeight: 28,
    color: '#495555',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  wisdomAuthor: {
    fontSize: 14,
    color: '#56695d',
    fontStyle: 'italic',
    textAlign: 'right',
  },
})