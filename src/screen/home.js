import * as React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {getPokemons} from '../query';
import {handleColor} from '../utils';

const {width} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const [first, setFirst] = React.useState(27);
  const [datas, setDatas] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    axios({
      url: 'https://pokemon-fclzip.pahamify.com/',
      method: 'post',
      data: {
        query: getPokemons(first),
      },
    })
      .then(({data: {data}}) => {
        setDatas(data.pokemons);
      })
      .catch((err) => {
        alert('oops, something wrong!');
        console.log(err);
      });
  }, [first]);

  const onChangeText = (text) => {
    setFirst(text === '' ? 27 : 500);
    setSearch(text);
  };

  const handleFilter = (dataFilter) => {
    return dataFilter.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  let myReff = React.useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#e41c23" />
      <View style={styles.search}>
        <TextInput
          value={search}
          style={{fontSize: 12}}
          onChangeText={onChangeText}
          placeholder="Search by name"
        />
      </View>
      <View style={styles.content}>
        <ScrollView ref={myReff} onScrollEndDrag={() => setFirst(first + 27)}>
          <View style={styles.wrap}>
            {search !== '' && handleFilter(datas).length === 0 ? (
              <Text style={{textAlign: 'center', width: '100%'}}>
                No data found
              </Text>
            ) : (
              handleFilter(datas).map((pokemon, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      id: pokemon.id,
                      name: pokemon.name,
                    })
                  }
                  style={styles.list}>
                  <Text style={styles.number}>{`#${pokemon.number}`}</Text>
                  <Image style={styles.image} source={{uri: pokemon.image}} />
                  <Text style={{textAlign: 'center'}}>{pokemon.name}</Text>
                  <View style={styles.types}>
                    {pokemon.types.map((type, j) => (
                      <View key={j} style={styles.typeList(type)}>
                        <Text style={{fontSize: 10, color: 'white'}}>
                          {type}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#e41c23'},
  search: {
    margin: '1%',
    elevation: 5,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: '2.5%',
  },
  content: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    margin: 5,
    padding: 5,
    elevation: 5,
    borderRadius: 5,
    width: width / 3 - 15,
    height: width / 3 - 15,
    backgroundColor: 'white',
  },
  number: {
    color: 'grey',
    fontSize: 11,
  },
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  typeList: (type) => ({
    width: '45%',
    paddingVertical: '1%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: handleColor(type),
  }),
});

export default HomeScreen;
