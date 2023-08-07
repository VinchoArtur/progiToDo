import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  taskItem: {
    padding: 5,
    marginTop: 1,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255, 0.3)',
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
    padding: 10,
    backgroundColor: '#2d525a',
    borderRadius: 10,
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
  timeDescription: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    color: '#fff',
  },
});
