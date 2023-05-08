import {ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {View, Text, LoaderScreen} from 'react-native-ui-lib';
import CardOpcion from './CardOption';
import {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

// Recibe un objeto de navegación
type CuentosProps = {
	navigation: NavigationProp<any>;
};

//Arreglo con los cuentos y su información
const cuentos = [
	{
		id: 0,
		url: 'http://radioteca.net/media/uploads/old_radioteca/audios/05100003.mp3',
		title: 'La Lechuga',
		artist: 'Teresa disfurtar ayudar a su abuelo en la huerta',
		artwork: require('../../assets/images/lechuga.png'),
	},
	{
		id: 1,
		url: 'http://radioteca.net/media//uploads/old_radioteca/audios/05100165.mp3',
		title: 'El Terrible Problema de Murciélago',
		artist: 'Un pequeño muerciélago con problemas de sueño',
		artwork: require('../../assets/images/murcielago.png'),
	},
	{
		id: 2,
		url: 'http://radioteca.net/media/uploads/old_radioteca/audios/05100087.mp3',
		title: 'El Gato Enamorado',
		artist: 'Toda la dulzura del amor gatuno',
		artwork: require('../../assets/images/gatito.jpg'),
	},
	{
		id: 3,
		url: 'http://radioteca.net/media//uploads/old_radioteca/audios/05100002.mp3',
		title: 'El Ciempiés Bailarín',
		artist: 'Un alegre ciempiés que no puede dejar de cantar, bailar y zapatear todo el día',
		artwork: require('../../assets/images/cien.jpg'),
	},
	{
		id: 4,
		url: 'http://radioteca.net/media//uploads/old_radioteca/audios/05100188.mp3',
		title: 'Tatú y su Abrigo Mágico',
		artist: 'Tatú, el armadillo, está confeccionando una bonita capa de tejido fino',
		artwork: require('../../assets/images/armadillo.jpg'),
	},
	{
		id: 5,
		url: 'http://radioteca.net/media/uploads/old_radioteca/audios/11030046.mp3',
		title: 'Los Chivitos que no Querían Andar',
		artist: 'Un niño intentando conducir sus chivitos de regreso al hogar',
		artwork: require('../../assets/images/chivos.jpg'),
	},
	{
		id: 6,
		url: 'http://radioteca.net/media//uploads/old_radioteca/audios/05100208.mp3',
		title: 'La Promesa de los Elefantes',
		artist: 'El rey elefante ha enfermado y todos los animalitos vecinos buscarán el modo de aliviar su malestar',
		artwork: require('../../assets/images/elefante.jpg'),
	},
	{
		id: 7,
		url: 'http://radioteca.net/media//uploads/audios/2013_03/AUDIO-1200279.mp3',
		title: 'El Árbol Mágico',
		artist: 'Recordemos los buenos modales',
		artwork: require('../../assets/images/arbol.jpg'),
	},
	{
		id: 8,
		url: 'http://radioteca.net/media/uploads/old_radioteca/audios/05100004.mp3 ',
		title: 'La Araña y el Ciempiés y Caracol Col (2 en 1)',
		artist: 'Pequeñas y entretenidas historias de animales y otros personajes que conviven en el huerto',
		artwork: require('../../assets/images/araña.png'),
	},
];

const CuentosShort = ({navigation}: CuentosProps) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	useEffect(() => {
		//Inicializar TrackPlayer
		const startPlayer = async () => {
			try {
				setIsTrackPlayerInit(true);
			} catch (error) {
				console.log(error);
			}
		};
		startPlayer();
	}, []);

	useEffect(() => {
		//Cargar los cuentos en cola
		const addTracks = async () => {
			try {
				await TrackPlayer.reset(); // Limpia la cola de reproducción antes de agregar nuevos audios
				await TrackPlayer.add(cuentos); // Añade todos los cuentos a la cola de reproducción
			} catch (error) {
				console.log('Error al agregar las canciones a la cola:', error);
			}
		};
		if (isTrackPlayerInit) {
			addTracks();
		}
	}, [isTrackPlayerInit]);
	return (
		<View style={{height: '100%'}}>
			<ScrollView>
				<View
					style={{
						alignSelf: 'flex-start',
						marginBottom: 15,
						alignItems: 'center',
						padding: 15,
					}}>
					<Text text60>Selecciona un Audio</Text>
				</View>
				<View style={{alignItems: 'center', gap: 20, top: '-3%'}}>
					{cuentos.map((elemento, i) => (
						<CardOpcion
							key={i}
							navigation={navigation}
							to="Reproductor"
							id={elemento.id}
							url={elemento.url}
							title={elemento.title}
							artist={elemento.artist}
							artwork={elemento.artwork}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default CuentosShort;
