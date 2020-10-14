import * as React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {handleColor} from '../utils';
import {getPokemonDetails} from '../query';

const {width, height} = Dimensions.get('window');

function DetailScreen({navigation, route}) {
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerStyle: {
        backgroundColor: handleColor(
          details && details.types.length > 0 ? details.types[0] : '',
        ),
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <View
          style={{
            width: width * 0.15,
          }}>
          <Text style={{color: 'white'}}>{`#${
            details ? details.number : 0
          }`}</Text>
        </View>
      ),
    });
  }, [details]);

  React.useEffect(() => {
    axios({
      url: 'https://pokemon-fclzip.pahamify.com/',
      method: 'post',
      data: {
        query: getPokemonDetails(route.params.name, route.params.id),
      },
    })
      .then(({data: {data}}) => {
        setDetails(data.pokemon);
        setLoading(false);
      })
      .catch((err) => {
        alert('oops, something wrong!');
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={{backgroundColor: '#f4f7fa'}}>
      <StatusBar
        backgroundColor={handleColor(
          details && details.types.length > 0 ? details.types[0] : '',
        )}
      />
      <View style={styles.container}>
        <View style={styles.imageAndAttacks}>
          <View style={styles.imageContainer}>
            <Image source={{uri: details.image}} style={styles.image} />
          </View>
          <View style={styles.attacks}>
            <Text style={{color: '#7e94b3', fontWeight: 'bold'}}>Attacks</Text>
            <View style={styles.attackContainer}>
              <View style={{flex: 1}}>
                {details.attacks &&
                  details.attacks.fast.length > 0 &&
                  details.attacks.fast.map((att, idx) => (
                    <View key={idx} style={{marginBottom: 5}}>
                      <Text style={{fontSize: 10}}>{att.name}</Text>
                      <View style={styles.barContainer}>
                        <View style={styles.bar(att, 20)} />
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{flex: 1}}>
                {details.attacks &&
                  details.attacks.special.length > 0 &&
                  details.attacks.special.map((att, idx) => (
                    <View key={idx} style={{marginBottom: 5}}>
                      <Text style={{fontSize: 10}}>{att.name}</Text>
                      <View style={styles.barContainer}>
                        <View style={styles.bar(att, 120)} />
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.textDetail}>Types</Text>
          <View style={styles.types}>
            <Text>{details.types.toString().split(',').join(', ')}</Text>
          </View>
          <Text style={styles.textDetail}>Classification</Text>
          <View style={styles.types}>
            <Text>{details.classification}</Text>
          </View>
          <Text style={styles.textDetail}>Resistant</Text>
          <View style={styles.types}>
            <Text>{details.resistant.toString().split(',').join(', ')}</Text>
          </View>
          <Text style={styles.textDetail}>Evolutions</Text>
          <View style={{width: '100%'}}>
            {details.evolutions &&
              details.evolutions.map((evo, i) => (
                <View key={i} style={styles.evolutionList}>
                  <View style={styles.evolutionBar}>
                    <Image
                      source={{uri: evo.image}}
                      style={styles.imageEvolutions}
                    />
                  </View>
                  <View style={{width: '70%'}}>
                    <Text
                      style={{
                        marginVertical: '2.5%',
                      }}>{`#${evo.number} - ${evo.name}`}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {evo.types.map((type, j) => (
                        <View key={j} style={styles.typeEvolution(type)}>
                          <Text style={{fontSize: 12, color: 'white'}}>
                            {type}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2.5%',
    backgroundColor: '#f4f7fa',
  },
  imageAndAttacks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: width * 0.4,
    height: width * 0.4,
    marginVertical: '5%',
    marginRight: '2.5%',
    backgroundColor: 'white',
    borderRadius: width * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: width * 0.5,
  },
  attacks: {
    width: width * 0.5,
    borderWidth: 1,
    minHeight: width * 0.3,
    borderColor: '#7e94b3',
    borderRadius: 5,
    padding: '2.5%',
  },
  attackContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  barContainer: {
    width: '80%',
    height: 7,
    marginTop: 3,
    borderRadius: 5,
    backgroundColor: '#dfe8f3',
  },
  bar: (att, best) => ({
    height: '100%',
    borderRadius: 5,
    width: `${(att.damage * 100) / best}%`,
    backgroundColor: '#7e94b3',
  }),
  textDetail: {fontWeight: 'bold', color: '#7e94b3'},
  types: {
    width: '100%',
    marginBottom: '5%',
    borderBottomWidth: 1,
    paddingVertical: '3%',
    borderBottomColor: '#dfe8f3',
  },
  evolutionList: {
    padding: '2.5%',
    marginTop: '5%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfe8f3',
  },
  evolutionBar: {
    marginRight: '5%',
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.2,
    backgroundColor: 'white',
  },
  imageEvolutions: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    borderRadius: width * 0.2,
  },
  typeEvolution: (type) => ({
    paddingHorizontal: '5%',
    width: '30%',
    borderRadius: 20,
    marginRight: '5%',
    alignItems: 'center',
    paddingVertical: '1%',
    justifyContent: 'center',
    backgroundColor: handleColor(type),
  }),
});

export default DetailScreen;
