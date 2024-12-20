import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import MovieItem from '../component/MovieItem';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const removeHtmlTags = (text?: string): string | null=> {
  if (text === null) return null;
  else return text.replace(/<[^>]*>/g, ''); 
};


const HomeScreen = () => {
  const [movies, setMovies] = useState<Show[]>([]);
  const navigator=useNavigation();
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        'https://api.tvmaze.com/search/shows?q=all',
      );
      const data: ApiResponse[] = await response.json();
      console.log(
        'Movies:',
        data.map(item => item.show.name),
      );
      setMovies(data.map(item => item.show));
    };

    fetchMovies();
  }, []);

  const renderMovie = ({item}: {item: Show}) => (
    <MovieItem
      title={item.name}
      image={item.image?.medium}
      description={removeHtmlTags(item.summary)}
      onPress={() => { navigator.navigate('Details',{movie:item})}}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovie}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090F0E',
  },
  list: {
    padding: 10,
  },
});

export default HomeScreen;
