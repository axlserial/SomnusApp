import Screen from './screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const CalculadoraStack = createNativeStackNavigator();

const CalculadoraScreen = () => {
	return (
		<CalculadoraStack.Navigator initialRouteName="Calculadora">
			<CalculadoraStack.Screen
				name="Calculadora"
				component={Screen}
				options={{headerShown: false}}
			/>
		</CalculadoraStack.Navigator>
	);
};

export default CalculadoraScreen;
