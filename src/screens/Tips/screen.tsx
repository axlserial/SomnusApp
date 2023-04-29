import { Alert, Animated, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Carousel } from 'react-native-ui-lib';
import DATA from './DATA';
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import React from 'react';

// Recibe un objeto de navegación
type ScreenProps = {
	navigation: NavigationProp<any>;
};

//inicialización 
const MMKV = new MMKVLoader().initialize();

function gurdarFav(indice: number, title: string, DATAFAV: any) {
	let datoValido = true
	//corroborar que el item no ha sido agregado anteriormente
	for (let index = 0; index < DATAFAV.length; index++) {
		const element = DATAFAV[index];
		if (element.title == title) {
			datoValido = false
		}
	}
	//muestra alerta si hay elementos repetidos
	if (datoValido == true) {

		Alert.alert('Favorito añadido a la lista')
	} else {
		Alert.alert('¡Excelente! este tip ya lo tienes en tu lista')
	}
	return datoValido
}



const Screen = ({ navigation }: ScreenProps) => {
	const isCarousel = React.useRef(null)
	//si no hay ningun favorito, muestra este  mesaje
	const favVacio =
		[{
			id: 0,
			title: 'Aun no tienes tips favoritos, añadelos'
		}];

	const [dataSaveFav, setdataSaveFav] = useMMKVStorage("gato123", MMKV, favVacio);
	const [fadeIn, setFadeIn] = React.useState(new Animated.Value(0))
	//console.log(dataSaveFav)
	const changeFav = (item: any) => {
		let res = gurdarFav(item.id, item.title, dataSaveFav)
		if (dataSaveFav[0].id == 0)
			dataSaveFav[0].id = -1
		if (res == true) {
			//si ya esta en el mmkv no lo agrega a la lista de favoritos
			setdataSaveFav(dataSaveFav.concat(item))
		}
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<SafeAreaView style={styles.container}>
					<ScrollView >
						<Text style={styles.title}>Tips</Text>
						<View>
							{(dataSaveFav[0].id == 0) ?
								<View style={styles.fixToText}>
									<Text style={styles.textApp}>{favVacio[0].title}</Text>
									<TouchableOpacity style={{
										borderTopRightRadius: 10,
										borderBottomRightRadius: 10,
										flex: 1,
										justifyContent: "center",
										alignItems: 'center'
									}}>
									</TouchableOpacity>
								</View>
								:
								<Carousel autoplay loop showCounter style={{ marginTop: 20 }}>
									{dataSaveFav.map((item1, index) => (
										<View key={index}>
											{(item1.id != -1)
												?
												<View style={styles.fixToText}>
													<Text style={styles.textApp}>{item1.title}</Text>
													<TouchableOpacity style={{
														borderTopRightRadius: 10,
														borderBottomRightRadius: 10,
														flex: 1,
														justifyContent: "center",
														alignItems: 'center'
													}}>
														<Text text40 >&#128153;</Text>
													</TouchableOpacity>
												</View>
												:
												<Card
													row
													elevation={3}
													style={{ width: '90%', height: '53%', backgroundColor: "#004B6F" }}>
													<ImageBackground
														source={require('../../assets/images/paisaje.png')}
														imageStyle={{ borderRadius: 10 }}
														style={{
															flex: 1,
															width: '100%',
															height: '100%',
															borderRadius: 10,
															alignItems: 'center'
														}}>
														<Text text30 $textDefault style={{ fontWeight: 'bold' }}>
															Mis favoritos
														</Text>
														<Text text80 $textDefault style={styles.cardd}>
															Tu lista de tips para mejorar tu sueño.
														</Text>
														<View
															style={{
																height: '100%',
																width: '20%',
																alignSelf: 'flex-end',
																backgroundColor: 'transparent',
																borderTopRightRadius: 10,
																borderBottomRightRadius: 10,
															}}>
														</View>
													</ImageBackground>
												</Card>
											}

										</View>
									))}
								</Carousel>
							}
						</View>
						{(dataSaveFav.length == 1)
							?
							<View style={{ top: "0%" }}>
								<Text style={styles.subtitle} >Listado</Text>
								{DATA.map((item2, index2) => (
									<View key={index2} >
										<View style={styles.fixToText}>
											<Text style={styles.textApp}>{item2.title}</Text>
											<TouchableOpacity style={{
												borderTopRightRadius: 10,
												borderBottomRightRadius: 10,
												flex: 1,
												justifyContent: "center",
												alignItems: 'center'
											}}>
												<Text text40 onPress={() => changeFav(item2)}>&#128156;</Text>
											</TouchableOpacity>
										</View>
									</View>
								))}
							</View>
							:
							<View style={{ top: "-44%" }}>
								<Text style={styles.subtitle} >Listado</Text>
								{DATA.map((item2, index2) => (
									<View key={index2} >
										<View style={styles.fixToText}>
											<Text style={styles.textApp}>{item2.title}</Text>
											<TouchableOpacity style={{
												borderTopRightRadius: 10,
												borderBottomRightRadius: 10,
												flex: 1,
												justifyContent: "center",
												alignItems: 'center'
											}}>
												<Text text40 onPress={() => changeFav(item2)}>&#128156;</Text>
											</TouchableOpacity>
										</View>
									</View>
								))}
							</View>
						}
					</ScrollView>
				</SafeAreaView>
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 1
	},
	main: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		alignItems: "center",
		justifyContent: "center"
	},
	subtitle: {
		fontSize: 36,
		fontWeight: 'bold',
	},
	textApp: {
		fontWeight: 'normal',
		width: "70%",
		textAlign: "justify",
		margin: 15,

	},
	fixToText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
		backgroundColor: "#0d2458",
		width: "88%",
		marginLeft: "0%",
		borderRadius: 10

	},
	btnFav: {
		backgroundColor: "#004B6F",
		alignItems: 'center',
		justifyContent: 'center',
		width: "30%",

	},
	fav: {
		fontSize: 25,
		marginRight: "50%",
	},
	cardd: {
		textAlign: "justify"
	}
});

export default Screen;
