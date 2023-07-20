import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    marginTop: 1,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
  },
  deleteIcon: {
    color: 'red',
    fontSize: 18,
    marginLeft: 10,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    height: '160%',
    opacity: 0.3,
  },
  closestTask: {},
});
