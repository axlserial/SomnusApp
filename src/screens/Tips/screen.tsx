import { Alert, Button, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
// Recibe un objeto de navegación
type ScreenProps = {
	navigation: NavigationProp<any>;
};
const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Respetar los horarios de sueño. Las personas adultas no necesitan pasar más de ocho horas en la cama. Acostarse y levantarse a la misma hora todos los días, es importante.',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Crear un entorno relajado: La habitación debe ser fresca, oscura y en silencio. La exposición a la luz puede hacer que resulte más difícil quedarse dormido.',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Limitar las siestas durante el día: Las siestas largas en el día pueden interferir en el sueño nocturno y por ello lo ideal es que no sean superiores a 30 minutos.',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
		title: 'Hacer ejercicio: La actividad física regular ayuda a dormir mejor. Sin embargo, es mejor evitar el exceso de ejercicio cerca a la hora de acostarse.',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f634',
		title: 'Controlar las preocupaciones: Lo ideal es resolver las preocupaciones o inquietudes antes de ir a dormir. La meditación puede aliviar la ansiedad.',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d724',
		title: 'Alimentación: Los especialistas recomiendan no irse a la cama con hambre ni sintiéndose muy lleno. Es importante evitar las comidas pesadas o muy abundantes un par de horas antes de acostarse.',
	},
	{
		id: '18694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Esconder el reloj. Ver las horas pasar puede ser estresante. La recomendación de los expertos de la biblioteca médica Medlineplus es voltear el reloj de manera que se pueda ver desde la almohada, pues esto evitará situaciones de ansiedad y estrés.',
	},
	{
		id: '2d7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
		title: 'Guardar los aparatos electrónicos. Apagar cualquier dispositivo que pueda recordar correos electrónicos que la persona necesita enviar o cosas que debe hacer.',
	},
	{
		id: '32c68afc-c605-48d3-a4f8-fbd91aa97f634',
		title: 'Limitar la cafeína. Puede ser útil para revitalizar por la mañana, pero puede generar efectos adversos si se consume en la tarde o antes de dormir.',
	},
	{
		id: '54694a0f-3da1-471f-bd96-145571e29d724',
		title: ' Limitar la cafeína. Puede ser útil para revitalizar por la mañana, pero puede generar efectos adversos si se consume en la tarde o antes de dormir.',
	},
];


type ItemProps = { title: string };
const Item = ({ title }: ItemProps) => (
	<View style={styles.fixToText}>
		<Text style={styles.textApp}>{title}</Text>
		<TouchableOpacity style={styles.btnFav}>
			<Text style={styles.fav} onPress={() => Alert.alert('Favorito añadido')}> &#128156;</Text>
		</TouchableOpacity>
	</View>
);

const Screen = ({ navigation }: ScreenProps) => {
	const isCarousel = React.useRef(null)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tips</Text>
			<View style={styles.main}>
				<SafeAreaView style={styles.container}>
					<Text style={styles.subtitle} >Favoritos</Text>
					<Carousel
						layoutCardOffset={5}
						ref={isCarousel}
						data={DATA}
						renderItem={CarouselCardItem}
						sliderWidth={SLIDER_WIDTH}
						itemWidth={ITEM_WIDTH}
						inactiveSlideShift={0}
						useScrollView={true}
					/>
					<Text style={styles.subtitle} >Listado</Text>
					<FlatList
						data={DATA}
						renderItem={({ item }) => <Item title={item.title} />}
						keyExtractor={item => item.id}

					/>
				</SafeAreaView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 64,
		fontWeight: 'bold',
		alignItems:"center",
		justifyContent:"center"
	},
	subtitle: {
		fontSize: 44,
		fontWeight: 'bold',
	},
	textApp: {
		fontSize: 16,
		fontWeight: 'bold',
		width: "70%",
		textAlign: "justify",
		margin: 15
	},
	fixToText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
		backgroundColor: "#1a63b2",  //'#1a63b2', //3382bc
		width:"70%",
		marginLeft:"10%"
	},
	btnFav: {
		backgroundColor: "#1a63b2",
		alignItems: 'center',
		justifyContent: 'center',
		width: "30%",
	},
	fav: {
		fontSize: 25,
		marginRight: "40%",
	},
	loopCarousel: {
		position: 'absolute',
		bottom: 15,
		left: 10
	},
	hor: {
		height: 90
	}
});

export default Screen;
