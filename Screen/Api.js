import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

const Api = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 10 }} onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#900" />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 18, paddingTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{item.id}</Text>
            <Text style={{ color: 'white', paddingLeft: 10 }}>{item?.body}</Text>
          </View>
          // Customize the rendering of each item as per your API response
        )}
      />
    </View>
  );
};

export default Api;
