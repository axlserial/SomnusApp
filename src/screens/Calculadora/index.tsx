import Screen from './screen';
import {Colors} from 'react-native-ui-lib';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens de la sección de Calculadora
import ResultadosDespertar from './resultadosDespertar';
import ResultadosDormir from './ResultadosDormir';
import Recordatorios from './Recordatorios';

const CalculadoraStack = createNativeStackNavigator();

/**
 * Stack que contiene las pantallas de la sección de Calculadora
 */
const CalculadoraScreen = () => {
	return (
		<CalculadoraStack.Navigator
			initialRouteName="Calculadora"
			screenOptions={{animation: 'slide_from_right'}}>
			<CalculadoraStack.Screen
				name="Calculadora"
				component={Screen}
				options={{headerShown: false}}
			/>
			<CalculadoraStack.Screen
				name="ResultadosDespertar"
				component={ResultadosDespertar}
				options={{
					title: '¿A que hora debo despertar?',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
			<CalculadoraStack.Screen
				name="ResultadosDormir"
				component={ResultadosDormir}
				options={{
					title: '¿A que hora debo dormir?',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
			<CalculadoraStack.Screen
				name="Recordatorios"
				component={Recordatorios}
				options={{
					title: 'Recordatorios de ir a dormir',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
		</CalculadoraStack.Navigator>
	);
};

export default CalculadoraScreen;
