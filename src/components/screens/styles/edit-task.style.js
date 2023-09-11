import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#133b45',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#133b45',
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateInputContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    alignContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateInput: {
    width: "100%",
    minWidth: 250,
    color: '#fff',
    height: 75,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
    borderRadius: 5,
    borderLeftColor: '#dc1a1a'
  },
  dateTextInput: {
    width: '25%',
    right: 10,
    position: 'absolute',
    color: '#fff',
    height: 75,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
    borderRadius: 5,
    borderLeftColor: '#dc1a1a'
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    color: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    width: '100%',
    color: '#fff',
    height: 120,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
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
  pickerComponent: {
    color: '#ffffff',
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: '#ffffff'
  }
});
