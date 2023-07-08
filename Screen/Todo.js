import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Todo = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

  const addTodo = () => {
    if (todoText !== '') {
      const newTodo = {
        id: Math.random().toString(),
        text: todoText,
      };

      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = () => {
    if (editedTodoText !== '') {
      const updatedTodos = todos.map(todo => {
        if (todo.id === editingTodoId) {
          return {...todo, text: editedTodoText};
        }
        return todo;
      });

      setTodos(updatedTodos);
      setEditingTodoId(null);
      setEditedTodoText('');
    }
  };

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const renderItem = ({item}) => (
    <View style={styles.todoItem}>
      {editingTodoId === item.id ? (
        <TextInput
          value={editedTodoText}
          onChangeText={text => setEditedTodoText(text)}
          onSubmitEditing={updateTodo}
          style={styles.editTextInput}
          autoFocus
        />
      ) : (
        <Text style={styles.todoText}>{item.text}</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => startEditing(item.id, item.text)}
          disabled={editingTodoId !== null}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTodo(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{ paddingTop: 10}}
        onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#900" />
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Enter Todo"
          placeholderTextColor={'white'}
          value={todoText}
          onChangeText={text => setTodoText(text)}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.add}>Add Todo</Text>
        </TouchableOpacity>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.todoList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  input: {
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color:"white"
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  editTextInput: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
    width: 100,
    alignSelf: 'center',
    paddingVertical: 10,
    backgroundColor: '#4169e1',
    borderRadius: 5,
    marginTop: 10,
  },
  add: {
    color: 'black',
    fontWeight: '600',
    alignSelf: 'center',
  },
  editButton: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#337ab7',
    borderRadius: 3,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#a52a2a',
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Todo;
