import {Card, View, Text} from 'react-native-ui-lib';
import {NavigationProp} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

type CardOpcionProps = {
	navigation: NavigationProp<any>;
	to: string;
	titulo: string;
	desc: string;
	icon: string
};

/**
 * Card que muestra el botón de una opción del menú principal
 * @param navigation Navigation para navegar a la pantalla correspondiente
 * @param to Nombre de la pantalla a la que se navegará
 * @param titulo Título de la opción
 * @param desc Descripción de la opción
 * @param icon Icono de la opción
 */
const CardOpcion = ({navigation, to, titulo, desc, icon}: CardOpcionProps) => {
	return (
		<Card
			row
			onPress={() => navigation.navigate(to)}
			elevation={3}
			style={{width: '100%', height: '15%'}}>
			<View
				style={{
					width: '80%',
					justifyContent: 'center',
					paddingLeft: 20,
					backgroundColor: '#1A3D82',
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
				}}>
				<Text text70 $textDefault style={{fontWeight: 'bold'}}>
					{titulo}
				</Text>
				<Text text80 $textDefault>
					{desc}
				</Text>
			</View>
			<View
				style={{
					height: '100%',
					width: '20%',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#1A3D82',
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
				}}>
				<Octicons
					name={icon}
					size={30}
					color="white"
					style={{marginRight: 10}}
				/>
			</View>
		</Card>
	);
};

export default CardOpcion;
