import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#133b45",
    padding: 10
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyStateText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff"
  },
  taskList: {
    flexGrow: 1
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    alignItems: "center"
  },
  taskTitle: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10
  },
  deleteIcon: {
    color: "red",
    fontSize: 18,
    marginLeft: 10
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "purple"
  },
  closestTask: {
    backgroundColor: "#ffcccc"
  }
});
