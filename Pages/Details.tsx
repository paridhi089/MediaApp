import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';

const removeHtmlTags = (text?: string): string | null => {
  if (text === null) return null;
  else return text.replace(/<[^>]*>/g, '');
};

const Details = () => {
  const route = useRoute();
  const data = route.params;
  const name = data.movie.name;
  console.log(data);
  const rating = data.movie?.rating?.average;
  let imageUrl;
  if (data.movie.image) {
    imageUrl = data.movie.image.original;
  } else {
    imageUrl = null;
  }

  const language = data.movie.language;
  const runtime = data.movie.runtime;
  const averageRuntime = data.movie.averageRuntime || 'N/A';
  const status = data.movie.status;
  const schedule = data.movie.schedule || {};
  const genres = data.movie.genres;
  const premiered = data.movie?.premiered;
  const ended = data.movie?.ended;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.overview}>
        <Image
          source={
            imageUrl ? {uri: imageUrl} : require('../assets/placeholder.png')
          }
          style={styles.image}
        />
        <View style={styles.overviewTextContainer}>
          <Text style={styles.textTitle}> {name}</Text>
          <Text style={styles.textOther}>Rating: {rating}</Text>
          <Text style={styles.textOther}>Language: {language}</Text>
          <Text style={styles.textOther}>Genre: {genres.join(', ')}</Text>
          <Text style={styles.textOther}>
            Average Runtime: {averageRuntime}
          </Text>
          <Text style={styles.textOther}>Status: {status}</Text>
          {schedule?.days && schedule?.time && (
            <Text style={styles.textOther}>
              Schedule: {schedule.days}, {schedule.time}
            </Text>
          )}

          {premiered && (
            <Text style={styles.textOther}>Premiered: {premiered}</Text>
          )}

          {ended && <Text style={styles.textOther}>Ended: {ended}</Text>}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textSummary}>
          {removeHtmlTags(data.movie.summary)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  overview: {
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  overviewTextContainer: {
    flexDirection: 'column',
    margin: 16,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  textOther: {
    paddingTop: 4,
    fontSize: 15,
  },
  textSummary: {
    fontSize: 15,
    padding: 16,
  },
  image: {
    width: '45%',
    height: 250,
    borderRadius: 8,
  },
  bottomContainer: {
    padding: 16,
    flexDirection: 'column',
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 16,
  },
});
