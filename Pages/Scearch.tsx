import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MovieItem from '../component/MovieItem';
const removeHtmlTags = (text?: string): string | null => {
  if (text === null) return null;
  else return text.replace(/<[^>]*>/g, '');
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();

  const fetchMovies = async (query: string) => {
    if (!query) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`,
      );
      const data = await response.json();
      if (data.length === 0) {
        setMovies([]);
      } else {
        setMovies(data.map(item => item.show));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchMovies(searchQuery);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const renderItem = ({item}: any) => (
    <MovieItem
      title={item.name}
      image={item.image?.medium}
      description={removeHtmlTags(item.summary)}
      onPress={() => {
        navigator.navigate('Details', {movie: item});
      }}
    />
  );

 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for shows..."
        value={searchQuery}
        placeholderTextColor="#fff"
        onChangeText={setSearchQuery}
        
      />
      
      {isLoading ? (
        <View style={styles.centered}>
          <Text style={styles.textCenter}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#090F0E',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#fff',
    borderRadius: 8,
    
  },
  textCenter:{
    textAlign:'center',
    color:'#fff'
  },
  movieCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  notFoundText: {
    fontSize: 18,
    color: '#888',
  },
});

export default SearchScreen;
