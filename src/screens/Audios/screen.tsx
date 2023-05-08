import {StyleSheet} from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native';

const loto = require('../../assets/images/agua.png');
const cuentos = require('../../assets/images/libro.png');
const image = require('../../assets/images/paisaje.png');

import CarouselAudi from './carouselAudi';
import CardOpcion from './CardAudiOp';

// Recibe un objeto de navegación
type ScreenProps = {
	navigation: NavigationProp<any>;
};

const Screen = ({navigation}: ScreenProps) => {
	return (
		<View style={{flex: 1, alignItems: 'center', padding: 10, gap: 50}}>
			<ScrollView>
			<View
					style={{
						alignSelf: 'flex-start',
						marginTop: 10,
						justifyContent: 'center',
					}}>
					<Text text60>
						Beneficios
					</Text>
				</View>
				<View style={{marginTop: 20}}>
					<CarouselAudi />
				</View>
			</ScrollView>
			<View style={{alignSelf: 'flex-start', marginBottom: -30}}>
				<Text text60>Selecciona un tema</Text>
			</View>
			<CardOpcion
				navigation={navigation}
				to="MusicRelax"
				titulo="Música relajante"
				desc="Duerme con melodias relajantes"
				icon="smiley"
				fondo={image}
			/>
			<CardOpcion
				navigation={navigation}
				to="MusicNature"
				titulo="Sonidos de la naturaleza"
				desc="Escuchar a la naturaleza da paz"
				icon="image"
				fondo={loto}
			/>
			<CardOpcion
				navigation={navigation}
				to="CuentosShort"
				titulo="Cuentos cortos"
				desc="Ten calma con bonitas historias"
				icon="book"
				fondo={cuentos}
			/>
		</View>
	);
};

export default Screen;
