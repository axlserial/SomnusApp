import {ScrollView} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

import CardOpcion from './CardOpcion';
import FasesCarousel from './FasesCarousel';

// Recibe un objeto de navegación
type ScreenProps = {
	navigation: NavigationProp<any>;
};

const Screen = ({navigation}: ScreenProps) => {
	return (
		<View style={{flex: 1, alignItems: 'center', padding: 15, gap: 10}}>
			<View
				style={{
					width: '100%',
					alignSelf: 'flex-start',
					marginBottom: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Text text60>Selecciona una opción</Text>
				<Icon.Button
					name="bell"
					backgroundColor={Colors.background}
					color={Colors.primary}
					size={20}
					style={{padding: 5}}
					iconStyle={{marginRight: 5, marginLeft: 3}}
					onPress={() => navigation.navigate('Recordatorios')}
				/>
			</View>
			<CardOpcion
				navigation={navigation}
				to="ResultadosDespertar"
				titulo="¿A que hora debo despertar?"
				desc="Selecciona la hora a la que quieres ir a dormir"
				icon="sun"
			/>
			<CardOpcion
				navigation={navigation}
				to="ResultadosDormir"
				titulo="¿A que hora debo dormir?"
				desc="Selecciona la hora a la que quieres despertar"
				icon="moon"
			/>
			<ScrollView>
				<View
					style={{
						alignSelf: 'flex-start',
						marginTop: 20,
					}}>
					<Text text60>¿Qué son los ciclos del sueño?</Text>
					<View style={{marginTop: 10}}>
						<Text text70>
							Son patrones regulares de actividad cerebral y
							corporal que ocurren durante el sueño, los cuales se
							dividen en varias fases o etapas.
						</Text>
						<Text text70 style={{marginTop: 10}}>
							Estos ciclos se repiten varias veces durante la
							noche y son esenciales para el descanso y la
							recuperación del cuerpo y la mente.
						</Text>
					</View>
					<View style={{marginTop: 20}}>
						<FasesCarousel />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Screen;
