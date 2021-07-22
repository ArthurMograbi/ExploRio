import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ScrollView,Image,View, FlatList, StyleSheet, Text,Component, TouchableOpacity, RecyclerViewBackedScrollView,PermissionsAndroid,
  Platform, ImageBackground , TextInput} from 'react-native';
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapViewDirections from 'react-native-maps-directions';
import { useState } from 'react';
import { useFonts } from 'expo-font';

const Stack = createDrawerNavigator();

const GOOGLE_MAPS_API_KEY = "AIzaSyBC40Vs9uushsVi6eNKaZEbatC6osZCrPU";

const mapstyle= [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dedede"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dedede"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dedede"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dedede"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dedede"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5cbee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    key:0,
    title: 'Palácio do Catete',
    endereco: 'Rua do Catete, XXX',
    bairro: 'Catete',
    visit_weekday:'Seg',
    visit_day:'13/12',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    key:1,
    title: 'Cristo Redentor',
    endereco: 'Rua Alguma Coisa, YYY',
    bairro: 'Laranjeiras',
    visit_weekday:'Ter',
    visit_day:'11/05',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    key:2,
    title: 'Pão de Açucar',
    endereco: 'Rua Outra Coisa, ZZZ',
    bairro: 'Urca',
    visit_weekday:'Quar',
    visit_day:'02/01',
  },
];

let favorited_places = [true,false,false];

let search_history = [1,2];

const MMarkers = (props) => {
  return props.list.map((data) => {
    return (
      <Marker
        id={data.id}
        key={data.key}
        coordinate={data.coordinate}
        image={data.image}
        title={data.title}
        description={data.line_description}>
          <Callout tooltip={true} style={styles.callout}>
              <Text  style={styles.map_marker}>
                <Text style={styles.callout_inner}>
                  <Text style={styles.callout_title}>{data.title}{'\n'}</Text>
                  <Image source={data.pic} resizeMode={'contain'}/>
                  <Text>{data.line_description}</Text>  
                </Text>
              </Text>
          </Callout>
      </Marker>
    )
  })
}

const existing_places = [
  {
    id: '0',
    key: 0,
    title: 'Palácio do Catete',
    endereco: 'Rua do Catete, XXX',
    coordinate:{latitude:-22.926116100164595,longitude: -43.17651038095307,},
    line_description:"Palácio onde Getúlio Morreu",
    bairro: 'Catete',
    image:require('./img/camera_location.png'),
    pic:require('./img/Palacio-Catete.png'),
    tag:'Museu',
    long_description:"O Museu da República é um museu histórico cuja sede é o Palácio do Catete, situado no bairro do Catete, zona sul da cidade do Rio de Janeiro. O Palácio do Catete é um importante exemplar da arquitetura neoclássica brasileira do final do século XIX. A missão do Museu da República é preservar, investigar e comunicar os objetos e documentos que testemunham a memória e a história da forma de governo republicana no Brasil. Integra a estrutura do Instituto Brasileiro de Museus, autarquia federal vinculada à Secretaria Especial de Cultura do Ministério do Turismo.",
    description_source:"DiarioRio",
    bfrpic:require('./img/palaciobfr.png'),
    aftrpic:require('./img/palacioaftr.png'),
    mapprint:require("./img/mapprintlagoa.png"),
  },
  {
    id: '1',
    key: 1,
    title: "Cristo Redentor",
    endereco: 'Rua Alguma Coisa, YYY',
    coordinate:{latitude:-22.952004900100572,longitude: -43.2107125079814,},
    line_description:"O cara do T-Pose Grandão",
    bairro: 'Laranjeiras',
    image:require('./img/camera_location.png'),
    pic:require('./img/Cristo-Redentor.png'),
    tag:'Ao ar livre',
    long_description:"De acordo com relatos históricos, os pedalinhos foram introduzidos na Lagoa Rodrigo de Freitas pelo aviador letão Herberts Cukurs.“As chamadas ‘bicicletas aquáticas’, mais conhecidas como “pedalinhos”, foram um negócio que ajudou tamém a revitalizar uma zona problemática do Rio.",
    description_source:"DiarioRio",
    bfrpic:require('./img/bfrcristo.png'),
    aftrpic:require('./img/aftrcristo.png'),
    mapprint:require("./img/mapprintlagoa.png"),
  },
  {
    id: '2',
    key: 2,
    title: 'Pão de Açucar',
    endereco: 'Rua Outra Coisa, ZZZ',
    coordinate:{latitude:-22.94980956584802,longitude: -43.156137147714624,},
    line_description:"Nem parece mas fds",
    bairro: 'Urca',
    image:require('./img/camera_location.png'),
    pic:require('./img/Pao_Acucar.png'),
    tag:'Ao ar livre',
    long_description:"De acordo com relatos históricos, os pedalinhos foram introduzidos na Lagoa Rodrigo de Freitas pelo aviador letão Herberts Cukurs.“As chamadas ‘bicicletas aquáticas’, mais conhecidas como “pedalinhos”, foram um negócio que ajudou tamém a revitalizar uma zona problemática do Rio.",
    description_source:"DiarioRio",
    bfrpic:require('./img/bfrpao.png'),
    aftrpic:require('./img/aftrpao.png'),
    mapprint:require("./img/mapprintlagoa.png"),
  },
];

const Item = ({navigation,index,title,endereco,bairro,visit_weekday,visit_day }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() =>navigation.navigate('Place',{index:index})}>
    <Text>
      <Text style={styles.item_text}>{title}{'\n'}</Text>
      <Text style={styles.item_address}>{endereco} - {bairro}</Text>
    </Text>
    </TouchableOpacity>
    <Image source={favorited_places[index]? require("./img/star-solid.png"):require("./img/star-empty.png")} style={styles.favestar}/>

    <Text style={styles.rtext}>
      <Text style={styles.item_text}>{visit_weekday}{'\n'}</Text>
    <Text style={styles.rtext}>{visit_day}</Text>
    </Text>
  </View>
);

const CondPlace = ({navigation,item,category}) => (
  <View style={styles.filterlistitemcont}>
    {((category==null)||(category==item.tag)) &&
    <View style={styles.filterlistitem}>
      <Image style={styles.filterlistitemimg} source={item.pic}/>
      <TouchableOpacity style={styles.filterlistitembuttom} onPress={() =>navigation.navigate('Place',{index:item.key})}>
        <Text style={{color:'#FFF',}}>Ver mais {'>'}</Text>
      </TouchableOpacity>
      <Text style={styles.filterlistitemtext}>{item.title}</Text>
      <Text style={styles.filterlistitemtext2}>{item.endereco}</Text>
      <Text style={styles.filterlistitemdistancetxt}>5 min à pé</Text>
      <Text style={styles.filterlistitemdistancetxt2}>à 1.1km</Text>
    </View>}
  </View>
);

const txt2index = (txt) => {
  for (let i = 0; i < existing_places.length; i++) {
    if ((existing_places[i].title).startsWith(txt)) return i;
  }
  return -1;
};

const PlaceDirView = ({modetransport,place,navigation}) => (
    <ScrollView style={styles.placedircontainer}>
    <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
        <MapViewDirections
          origin={myAdd}
          destination={existing_places[place.key].coordinate}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={2}
          strokeColor="hotpink"/>
    </MapView>
    <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
      <Image source={require('./img/menu.png')} style={{ width: 50, height: 50,top:0, tintColor:'#FFF'}}/>
    </TouchableOpacity>
    <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:28,}}/>
    <View style={styles.placedirbottomcontainer}>
        <View style={{padding:20,}}>
        <TouchableOpacity onPress={() =>navigation.navigate('Filter')} >
          <Image source={require("./img/arrow-left-solid.png")} style={styles.backarrowimg}/>
          <Text style={styles.backarrowtxt}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{favorited_places[place.key]=!favorited_places[place.key]}}>
          <Image style={styles.placestar} source={require("./img/star-empty.png")}/>
        </TouchableOpacity>
        <Text style={styles.placedisttime}>13 min a pé</Text>
        <Text style={styles.placedist}>à 4 km</Text>
        <Text style={styles.placetitle}>{place.title}</Text>
        <Text style={styles.placetag}>{place.tag}</Text>
        <Text style={styles.placecomopretendeir2}>Como você pretende ir?</Text>
        <View style={styles.modesoftransportcont}>
          <View style={styles.modesoftransport}>
            <Image source={require("./img/walking-solid.png")} style={styles.modesoftransportimg}/>
            <Text style={styles.modesoftransporttxt}>Andando</Text>
          </View>
          <View style={{flex:.25}}/>
          <View style={styles.modesoftransport2}>
            <Image source={require("./img/car-solid.png")} style={styles.modesoftransportimg}/>
            <Text style={styles.modesoftransporttxt}>De carro</Text>
          </View>
          <View style={{flex:.25}}/>
          <View style={styles.modesoftransport2}>
            <Image source={require("./img/bicycle-solid.png")} style={styles.modesoftransportimg}/>
            <Text style={styles.modesoftransporttxt}>De bicicleta</Text>
          </View>
        </View>
        <Text style={styles.placecomopretendeir2}>Lugares e curiosidades durante o trajeto</Text>
        <Image source={place.pic} style={styles.placeinlinepic}/>
        <Text style={styles.placecomopretendeir}>Pedalinhos da lagoa</Text>
        <Text style={styles.placelongd}>{place.long_description}</Text>
        <Text style={styles.placedsource}>Texto por {place.description_source}</Text>
      </View>
    </View>
  </ScrollView>
);

const PlaceView = ({category,place,navigation}) => (
  <ScrollView style={styles.placecontainer}>
    <ImageBackground source={place.pic} style={styles.placepic}>
    <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
      <Image source={require('./img/menu.png')} style={{ width: 50, height: 50,top:0, tintColor:'#FFF'}}/>
    </TouchableOpacity>
    <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:28,}}/>
    </ImageBackground>
    <View style={styles.placebottomcontainer}>
        <View style={{padding:20,}}>
        <TouchableOpacity onPress={() =>navigation.navigate('Filter')} >
          <Image source={require("./img/arrow-left-solid.png")} style={styles.backarrowimg}/>
          <Text style={styles.backarrowtxt}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{favorited_places[place.key]=!favorited_places[place.key]}}>
          <Image style={styles.placestar} source={require("./img/star-empty.png")}/>
        </TouchableOpacity>
        <Text style={styles.placedisttime}>13 min a pé</Text>
        <Text style={styles.placedist}>à 4 km</Text>
        <Text style={styles.placetitle}>{place.title}</Text>
        <Text style={styles.placetag}>{place.tag}</Text>
        <Text style={styles.placelongd}>{place.long_description}</Text>
        <Text style={styles.placedsource}>Texto por {place.description_source}</Text>
        <Text style={styles.placevejaagr}>Veja agora!</Text>
        <View style={styles.bfraftrcont}>
          <Text style={styles.placebfrtxt}>Em 1950</Text>
          <Text style={styles.placeaftrtxt}>Hoje em dia</Text>
          <Image style={styles.placebfrpic} source={place.bfrpic}/>
          <Image style={styles.placeaftrpic} source={place.aftrpic}/>
          <Image style={{top:-225,left:'47.5%',transform:[{scaleX:-1}],}} source={require("./img/arrow-left-solid.png")} />
        </View>
        <Text style={styles.placeondefica}>Onde fica?</Text>
        <Image style={styles.placemapprint} source={place.mapprint}/>
        <TouchableOpacity onPress={() => navigation.navigate('GenDirections',{index:place.key})}>
          <Text style={styles.placetracartrajeto}>Traçar meu trajeto</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null}}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{title:"Mapa"}}
        />
        <Stack.Screen
          name="Direction"
          component={GenDirectionsScreen}
          options={{title:"Trajeto"}}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{title:"Explorar"}}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{title:"Favoritos"}}
        />
        <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null}}/>
        <Stack.Screen
            name="Place"
            component={PlaceScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null}}/>
        <Stack.Screen
            name="GenDirections"
            component={DirectionScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null}}/>
        <Stack.Screen
            name="RoutePlace"
            component={RoutePlaceScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const IntroScreen = ({ navigation }) => {
  let [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  const nav2main = () => {navigation.navigate('Home')};
  if(!loaded){return(<View></View>);}
  return(
    <TouchableOpacity onPress={nav2main}>
      <Image source={require('./img/logo.png')}style={{alignSelf:'center',top:'40%',width:'50%',height:'50%',}}/>
      <Text style={{color:'blue',textAlign:'center',fontFamily:'OpenSans',top:"28%",fontSize:40,paddingBottom:50,fontWeight:"bold",letterSpacing:3}}
      >ExploRio</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  let [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  if(!loaded){return(<View></View>);}
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
      <TouchableOpacity
          style={isEnabled?  styles.bottombarmain :styles.bottombarmain2}
          onPress={toggleSwitch}>
        <View style={styles.bottombarhigh}/>
      </TouchableOpacity>
      <View style={isEnabled?  styles.bottombarbasemain :styles.bottombarbasemain2}>
        <Text style={styles.starttitle}>Olá, seja bem vindo!</Text>
        <Text style={{textAlign:'center',color:"#888",fontFamily:'OpenSans'}}>Por onde deseja começar?</Text>
        <View style={styles.mainimgcont}>
          <TouchableOpacity style={styles.exploreimg} onPress={() => navigation.navigate('Direction',{index:1})}>
            <Image source={require('./img/route-solid.png')} style={styles.maincategoryimg}/>
            <Text style={styles.maincategory}>Trajeto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreimg} onPress={() => navigation.navigate('Explore')}>
            <Image source={require('./img/search-solid.png')} style={styles.maincategoryimg}/>
            <Text style={styles.maincategory}>Explorar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>  
  );
};


const myAdd={latitude:-22.93571784988072,longitude: -43.18001014934873};

const DirectionScreen = ({route, navigation}) => {
  const {index} = route.params;
  return(
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
        <MapViewDirections
          origin={myAdd}
          destination={existing_places[index].coordinate}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={2}
          strokeColor="hotpink"/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
    </View>  
  );
};

const GenDirectionsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  let [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  
  const renderItem = ({ item }) => (
    <Item
    navigation={navigation}
    index={item.key}
    title={item.title}
    endereco={item.endereco}
    bairro={item.bairro}
    visit_weekday={item.visit_weekday}
    visit_day={item.visit_day}/>
  );
  if(!loaded){return(<View></View>);}
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
      <TouchableOpacity
          style={isEnabled?  styles.bottombarmainalt :styles.bottombarmainalt2}
          onPress={toggleSwitch}>
        <View style={styles.bottombarhigh}/>
      </TouchableOpacity>
      <View style={isEnabled?  styles.bottombarbasemainalt :styles.bottombarbasemainalt2}>
        <Text style={styles.starttitle}>Trace seu trajeto</Text>
        <View style={styles.brkview}/>
        <View style={styles.searchplace}>
          <Image source={require('./img/search-solid.png')} style={styles.searchplaceimg}/>
          <TextInput
            style={styles.searchplacetxtin}
            onSubmitEditing={()=>navigation.navigate('RoutePlace',{txt:text})}
            onChangeText={text => setText(text)}
            placeholder="Para onde deseja ir?"
          />
        </View>
        <TouchableOpacity  style={styles.favoritesbuttoncont2} onPress={() =>navigation.navigate('Favorites')} >
            <Text style={styles.favoritesbutton}>Favoritos</Text>
        </TouchableOpacity>
        <Text style={styles.histbuscatitle}>Histórico de buscas</Text>
        <FlatList
          style={styles.history_list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>  
  );
};

const RoutePlaceScreen = ({route, navigation }) => {
  const {txt} = route.params;
  let index = txt2index(txt);
  if(index==-1)
  {
    return(
      <View>
      <Text style={styles.opstext}>
        Desculpa, esse lugar não foi encontrado...
      </Text>
    </View>
    );
  }
  else {
    return(
      <PlaceDirView place={existing_places[index]} modetransport={1} navigation={navigation}/>
    );
  }
};

const ExploreScreen = ({ navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
      <TouchableOpacity
          style={isEnabled?  styles.bottombar :styles.bottombar2}
          onPress={toggleSwitch}>
        <View style={styles.bottombarhigh}/>
      </TouchableOpacity>
      <ScrollView style={isEnabled?  styles.bottombarbase :styles.bottombarbase2}>
        <TouchableOpacity style={{width:150,}} onPress={() =>navigation.navigate('Home')} >
          <Text style={styles.backarrow}>{'<'} Voltar para Início</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.favoritesbuttoncont} onPress={() =>navigation.navigate('Favorites')} >
          <Text style={styles.favoritesbutton}>Favoritos</Text>
        </TouchableOpacity>
        <Text style={styles.exploretitle}>Explore ao seu redor</Text>
        <Text style={styles.exploresubtitle}>Escolha a categoria que tenha mais a ver com você para achar lugares para você</Text>
        <View style={styles.exploreimgcont}>
          <TouchableOpacity style={styles.exploreimg} onPress={() => navigation.navigate('Filter')}>
            <Image source={require("./img/globe-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/location-arrow-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Ao meu redor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exploreimgcont}>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/utensils-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Restaurantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/university-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Museus</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exploreimgcont}>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/leaf-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Natureza</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/umbrella-beach-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Lazer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exploreimgcont}>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/football-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Esporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreimg}>
            <Image source={require("./img/shopping-bag-solid.png")} style={styles.explorecategoryimg}/>
            <Text style={styles.explorecategory}>Lojas</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingBottom:20}}/>
      </ScrollView>
    </View>  
  );
};

const FavoritesScreen = ({ navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const renderItem = ({ item }) => (
    <Item
    navigation={navigation}
    index={item.key}
    title={item.title}
    endereco={item.endereco}
    bairro={item.bairro}
    visit_weekday={item.visit_weekday}
    visit_day={item.visit_day}/>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
      <TouchableOpacity
          style={isEnabled?  styles.bottombar :styles.bottombar2}
          onPress={toggleSwitch}>
        <View style={styles.bottombarhigh}/>
      </TouchableOpacity>
      <ScrollView style={isEnabled?  styles.bottombarbase :styles.bottombarbase2}>
        <TouchableOpacity style={{width:150,}} onPress={() =>navigation.navigate('Explore')} >
          <Text style={styles.backarrow}>{'<'} Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.favoritestitle}>Favoritos</Text>
        <FlatList
          style={styles.history_list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={{paddingBottom:20}}/>
      </ScrollView>
    </View>  
  );
};

const FilterScreen = ({ navigation}) => {
  const renderCondPlace = ({item,category}) => (
    <CondPlace
      navigation={navigation}
      item={item}
      category={category}/>
  );
  return (
    <View style={styles.filtercontainer}>
        <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
          <Image source={require('./img/menu.png')} style={{ width: 50, height: 50,top:5, }}/>
        </TouchableOpacity>
        <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:-5,}}/>
        <TouchableOpacity onPress={() =>navigation.navigate('Explore')} >
          <Image source={require("./img/arrow-left-solid.png")} style={styles.backarrowimg}/>
          <Text style={styles.backarrowtxt}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filtertxtcont}>
          <Text style={styles.filtertxt}><Image source={require("./img/filter-solid.png")}/> Filtrar</Text>
        </TouchableOpacity>
        <Text style={styles.exploretitle}>Todos</Text>
        <FlatList
          data={existing_places}
          renderItem={renderCondPlace}
          keyExtractor={item => item.id}/>
      </View>
  );
};

const PlaceScreen = ({route,navigation}) => {

  if(route==null) return(navigation.navigate('Home'));
  const {index} = route.params;
  return(
    <PlaceView place={existing_places[index]} navigation={navigation}/>
  );
};

const MapScreen = ({ navigation}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapstyle}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
        latitude: -22.987499636112343, 
        longitude: -43.228640763675564,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.0821,
      }}>
        <MMarkers list={existing_places}/>
      </MapView>
      <TouchableOpacity style={styles.menu_button} onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('./img/menu.png')} style={{ width: 50, height: 50 }}/>
      </TouchableOpacity>
      <Image source={require('./img/logo.png')} style={{ width: 40, height: 40, alignSelf:'center',top:"-90%",}}/>
    </View>  
  );
};

//-22.94980956584802, -43.156137147714624
const styles = StyleSheet.create({
  opstext:{
    textAlign:'center',
    textAlignVertical:'center',
    paddingTop:'40%',
    fontFamily:'OpenSans',
    color:"#888",
    fontSize:20,
    letterSpacing:1.5,
  },
  modesoftransportcont:{
    flexDirection:'row',
  },
  modesoftransport:{
    backgroundColor:'#2a2',
    padding:5,
    borderRadius:10,
    flex:1,
  },
  modesoftransport2:{
    backgroundColor:'#00afef',
    padding:5,
    borderRadius:10,
    flex:1,
  },
  modesoftransportimg:{
    tintColor:'#FFF',
    alignSelf:'center',
    height:50,
    width:40,
    resizeMode:'contain'
  },
  modesoftransporttxt:{
    color:'#FFF',
    alignSelf:'center',
    textAlign:'center',
  },
  placeinlinepic:{
    alignSelf:'center',
    width:'100%',
    borderRadius:10,
  },
  histbuscatitle:{
    fontFamily:'OpenSans',
    color:"#888",
    fontSize:20,
    letterSpacing:1,
    fontWeight:'bold',
    paddingTop:30,
  },
  brkview:{
    padding:10,
  },
  searchplaceimg:{
    height:20,
    width:20,
    position:'absolute',
    left:10,
    top:10,
    alignSelf:'flex-start',
    tintColor:'#646464',
  },
  searchplacetxtin:{
    fontFamily:'OpenSans',
    width:150,
  },
  searchplace:{
    flexDirection: 'row',
    backgroundColor:'#d9d9d9',
    paddingVertical:5,
    paddingHorizontal:'25%',
    borderRadius:10,
    alignSelf:'center',
  },
  placestar:{
    position:'absolute',
    width:20,
    height:20,
    top:0,
    right:100,
  },
  placedist:{
    textAlign:'center',
    position:'absolute',
    width:100,
    top:50,
    right:10,
    fontFamily:'OpenSans',
    color:'#646464',
    padding:5,
    borderRadius:5,
    color:'#FFF',
    backgroundColor:'#00afef',
  },
  placedisttime:{
    textAlign:'center',
    position:'absolute',
    width:100,
    top:30,
    right:10,
    fontFamily:'OpenSans',
    color:'#646464',
  },
  placetracartrajeto:{
    borderRadius:30,
    backgroundColor:'#2a2',
    textAlign:'center',
    color:'#FFF',
    fontWeight:'bold',
    fontFamily:'OpenSans',
    paddingVertical:10,
  },
  placemapprint:{
    borderRadius:10,
    height:150,
    width:320,
    resizeMode:'contain',
    paddingBottom:30,
  },
  placeondefica:{
    fontWeight:'bold',
    fontFamily:'OpenSans',
    paddingBottom:10,
    color:'#646464',
  },
  placecomopretendeir:{
    fontWeight:'bold',
    fontFamily:'OpenSans',
    paddingTop:10,
    color:'#646464',
  },
  placecomopretendeir2:{
    fontWeight:'bold',
    fontFamily:'OpenSans',
    paddingVertical:10,
    color:'#646464',
  },
  bfraftrcont:{
    paddingTop:20,
    height:200
  },
  placeaftrpic:{
    left:'60%',
    top:-155,
    height:125,
    width:125,
    borderRadius:10,
  },
  placebfrpic:{
    top:-30,
    height:125,
    width:125,
    borderRadius:10,
  },
  placeaftrtxt:{
    top:-30,
    left:'60%',
    fontFamily:'OpenSans',
    paddingBottom:10,
    color:'#646464',
  },
  placebfrtxt:{
    fontFamily:'OpenSans',
    paddingBottom:10,
    color:'#646464',
  },
  placevejaagr:{
    fontWeight:'bold',
    backgroundColor:'#d9d9d9',
    color:'#FFF',
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'OpenSans',
    paddingVertical:10,
    paddingHorizontal:'30%',
    borderRadius:20,
  },
  placedsource:{
    fontStyle:'italic',
    textAlign:'right',
    fontFamily:'OpenSans',
    paddingBottom:10,
    color:'#646464',
  },
  placelongd:{
    fontFamily:'OpenSans',
    paddingTop:10,
    color:'#646464',
  },
  placetag:{
    padding:5,
    borderRadius:20,
    fontFamily:'OpenSans',
    fontWeight:'bold',
    color:'#FFF',
    backgroundColor:'#00afef',
    width:100,
    textAlign:'center',
  },
  placetitle:{
    color:"#888",
    fontSize:20,
    paddingVertical:10,
    fontFamily:'OpenSans',
    fontWeight:'bold',
    letterSpacing:1,
  },
  placecontainer:{
    paddingBottom:0,
  },
  placedircontainer:{
    height:100,
  },
  placedirparent:{
  },
  placepic:{
    top:0,
    height:400,
    width:'105%',
  },
  placebottomcontainer:{
    backgroundColor:'#FFF',
    top:-210,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  placedirbottomcontainer:{
    backgroundColor:'#FFF',
    top:300,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    height:1200,
  },
  lineargradient:{
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  backarrowtxt:{
    paddingLeft:15,
    paddingTop:5,
    fontFamily:'OpenSans',
    color:'#888'
  },
  backarrowimg:{
    position:'absolute',
    top:10,
    height:10,
    width:10,
  },
  filtercontainer:{
    paddingHorizontal:10,
    paddingTop:40,
    paddingBottom:60,
  },
  filterlistitemdistancetxt:{
    position:'absolute',
    bottom:23,
    right:20,
    fontSize:10,
    color:'#AAA',
    fontFamily:'OpenSans',
  },
  filterlistitemdistancetxt2:{
    position:'absolute',
    bottom:5,
    right:10,
    paddingHorizontal:10,
    fontSize:12,
    borderRadius:5,
    color:'white',
    backgroundColor:'#00afef',
    fontFamily:'OpenSans',
  },
  filterlistitemimg:{
    height:135,
    width:'100.5%',
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
  },
  filterlistitembuttom:{
    position:'absolute',
    top:20,
    right:10,
  },
  filterlistitemtext:{
    position:'absolute',
    fontSize:20,
    paddingLeft:10,
    top:108,
    fontFamily:'OpenSans',
    color:'#FFF',
    fontWeight:'bold',
    letterSpacing:0.5,
  },
  filterlistitemtext2:{
    paddingLeft:10,
    paddingVertical:10,
    fontFamily:'OpenSans',
  },
  filterlistitemcont:{
    paddingVertical:5,
  },
  filterlistitem:{
    width:'100%',
    borderRadius:10,
    borderColor:'#AAA',
    borderWidth:1,
  },
  filtertxtcont:{
    fontFamily:'OpenSans',
    right:10,
    width:100,
    top:85,
    position:'absolute',
  },
  filtertxt:{
    color:'white',
    right:0,
    borderRadius:10,
    width:100,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'#2A2',
    fontFamily:'OpenSans',
  },
  explorecategoryimg:{
    alignSelf:'center',
    width:"80%",
    height:"80%",
  },
  explorecategory:{
    top:'10%',
    color:'#FFF',
    textAlign:'center',
    fontSize:12,
    paddingVertical:"10%",
    fontFamily:'OpenSans',
  },
  explorecategoryimg:{
    tintColor:'#FFF',
    alignSelf:'center',
    top:'15%',
    width:"50%",
    height:"50%",
    resizeMode:'contain',
  },
  maincategoryimg:{
    tintColor:'#FFF',
    alignSelf:'center',
    top:'15%',
    width:"50%",
    height:"50%",
  },
  maincategory:{
    top:'10%',
    color:'#FFF',
    textAlign:'center',
    fontSize:12,
    paddingVertical:"10%",
    fontFamily:'OpenSans',
  },
  starttitle:{
    color:"#888",
    textAlign:'center',
    fontSize:20,
    fontFamily:'OpenSans',
    fontWeight:'bold',
    letterSpacing:1,
  },
  exploresubtitle:{
    paddingHorizontal:10,
    color:"#888",
    fontFamily:'OpenSans',
  },
  backarrow:{
    width:150,
    paddingLeft:10,
    top:5,
    color:"#888",
    fontFamily:'OpenSans',
  },
  favoritesbutton:{
    textAlign:'right',
    backgroundColor:'#2A2',
    paddingVertical:5,
    paddingHorizontal:20,
    borderRadius:30,
    color:"#FFF",
    fontWeight:'bold',
    fontFamily:'OpenSans',
  },
  favoritesbuttoncont:{
    textAlign:'right',
    right:20,
    position:'absolute',
    top: 0,
  },
  favoritesbuttoncont2:{
    textAlign:'right',
    right:20,
    position:'absolute',
    top: 125,
  },
  favoritestitle:{
    color:"#888",
    textAlign:'center',
    alignSelf:'center',
    fontSize:25,
    fontFamily:'OpenSans',
    fontWeight:'bold',
    letterSpacing:1,
    position:'absolute',
    top:0,
  },
  exploretitle:{
    paddingLeft:10,
    color:"#888",
    textAlign:'left',
    paddingTop:15,
    fontSize:20,
    fontFamily:'OpenSans',
    fontWeight:'bold',
    letterSpacing:1,
  },
  exploreimgcont:{
    paddingTop:10,
    alignSelf:'center',
    fontSize:15,
    width:"100%",
    justifyContent: "space-around",
    flexDirection:'row',
  },
  mainimgcont:{
    paddingTop:30,
    alignSelf:'center',
    fontSize:15,
    width:"100%",
    justifyContent: "space-around",
    flexDirection:'row',
  },
  exploreimg:{
    fontSize:20,
    backgroundColor:"#11CDDE",
    height:90,
    width:90,
    borderRadius:20,
    resizeMode:'contain',
  },
  bottombarbase:{
    position:'absolute',
    width:"100%",
    height:0,
    bottom:0,
    backgroundColor: "#FFF",
  },
  bottombarbase2:{
    position:'absolute',
    width:"100%",
    height:400,
    bottom:0,
    backgroundColor: "#FFF",
    padding:10,

  },
  bottombarbasemain:{
    position:'absolute',
    width:"100%",
    height:0,
    bottom:0,
    backgroundColor: "#FFF",
  },
  bottombarbasemain2:{
    position:'absolute',
    width:"100%",
    height:200,
    bottom:0,
    backgroundColor: "#FFF",
    padding:10,

  },
  bottombarbasemainalt:{
    position:'absolute',
    width:"100%",
    height:0,
    bottom:0,
    backgroundColor: "#FFF",
  },
  bottombarbasemainalt2:{
    position:'absolute',
    width:"100%",
    height:400,
    bottom:0,
    backgroundColor: "#FFF",
    padding:10,

  },
  bottombarhigh:{
    width:"20%",
    height:3,
    borderRadius:2,
    top:15,
    backgroundColor: "#AAA",
  },
  bottombar:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:-40,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  bottombar2:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:360,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  bottombarmain:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:-40,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  bottombarmain2:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:160,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  bottombarmainalt:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:-40,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  bottombarmainalt2:{
    alignItems:'center',
    width:"100%",
    height:80,
    position:'absolute',
    bottom:360,
    borderRadius:20,
    backgroundColor: "#FFF",
  },
  callout_title:{
    width:"100%",
    textAlign:'center',
    fontSize:20,
  },
  map_marker:{
    alignItems:'center',
    flexWrap:'wrap',
    borderRadius:10,
    backgroundColor:"#FFF",
  },
  callout_inner:{
    width:"100%",
  },
  rtext:{
    color:"#888",
    top:8,
    fontFamily:'OpenSans',
    position:'absolute',
    textAlign:'right',
    right:0,
  },
  item_address:{
    color:"#888",
    fontFamily:'OpenSans',
    fontSize:12,
    opacity:0.6,
  },
  hist_title:{
    color:"#888",
    fontSize:25,
    top:100,
    opacity:0.6,
    textAlign:'center',
    borderBottomColor:"#FFF",
    borderBottomWidth:0.5,
    paddingHorizontal:20,
  },
  item_text:{
    color:"#888",
    fontSize:18,
    fontFamily:'OpenSans',
  },
  favestar:{
    position:'absolute',
    top:20,
    right:50,
    height:20,
    width:20,
    tintColor:'#F1CE0B',
  },
  item:{
    borderBottomColor:"#CCC",
    borderBottomWidth:1,
    paddingVertical:8,
  },
  history_list:{
    paddingTop:20,
    paddingHorizontal:5,
  },
  menu_button: {
    top: 20,
    left: 10,
    width: 50,
    resizeMode:'stretch',
    position: "absolute",
    tintColor: "black",
    opacity:1,
  },
  bb: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'yellow',
  },
  tophalf:{
    height:"45%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomhalf:{
    height:"55%",
    paddingBottom:"5%",
  },
  buttonrow:{
    justifyContent: "space-around",
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
  },
  mainmenubutton:{
    backgroundColor: "grey",
    height:"75%",
    borderRadius: 10,
    width: "35%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: 'center',
  },
  mainmenubuttontext:{
    textAlign:"center",
    justifyContent: "center",
  },
  mainmenuscreen:{
    justifyContent: "space-around",
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})


export default App;