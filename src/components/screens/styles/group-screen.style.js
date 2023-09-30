import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#133b45',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    color: '#ffffff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#133b45',
    paddingVertical: 20,
  },
  input: {
    width: '95%',
    color: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'left',
    paddingTop: 10,
    borderRadius: 5,
  },
  dropdown: {
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 10,   // Добавим небольшой отступ снизу
    marginLeft: 10,
  },
  buttonSpacer: {
    width: 10,
  },
})
