import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import React from 'react'

interface MovieCardProps {
  title: string;
  image: string | null;
  description: string;
  onPress: () => void;
}

const MovieItem: React.FC<MovieCardProps> = ({
  title,
  image,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={image ? {uri: image} : require('../assets/placeholder.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default MovieItem;

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#0E1513',
    overflow: 'hidden',
    shadowColor: '#1b1b1b',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width:"48%",
    minWidth:"48%",
    maxWidth:"48%"
  },
  image: {
    width: '100%',
    height: 250,
  },
  info: {
    padding: 10,
    width: '100%',
    maxWidth: '100%',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#fff'
  },
  description: {
    fontSize: 14,
    color: '#fff',
    
  },
});
