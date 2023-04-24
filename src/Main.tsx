import {View} from 'react-native';
import Text from 'react-native-ui-lib/text';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';

// Importar las pantallas
import AudioScreen from './screens/Audios';
import CalculadoraScreen from './screens/Calculadora';
import TipsScreen from './screens/Tips';

// Componente principal de navegación
const Tab = createBottomTabNavigator();

// Array de las pantallas
const screens = [
	{
		name: 'AudiosGroup',
		component: AudioScreen,
		title: 'Audios',
		icon: 'play',
	},
	{
		name: 'CalculadoraGroup',
		component: CalculadoraScreen,
		title: 'Calculadora',
		icon: 'number',
	},
	{
		name: 'TipsGroup',
		component: TipsScreen,
		title: 'Tips',
		icon: 'code-of-conduct',
	},
];

const Main = () => {
	return (
		<Tab.Navigator
			initialRouteName="CalculadoraGroup"
			screenOptions={() => ({
				tabBarActiveTintColor: '#337AA6',
				tabBarStyle: {
					backgroundColor: '#0B1E45',
					height: 65,
					borderTopWidth: 0,
				},
			})}>
			{screens.map((screen, index) => (
				<Tab.Screen
					key={index}
					name={screen.name}
					component={screen.component}
					options={{
						headerShown: false,
						title: screen.title,
						tabBarIcon: ({color, size}) => (
							<View style={{bottom: 0}}>
								<Octicons
									name={screen.icon}
									color={color}
									size={size}
								/>
							</View>
						),
						tabBarLabel: ({color}) => (
							<Text
								style={{
									color: color,
									fontWeight: 'bold',
									bottom: 8,
								}}>
								{screen.title}
							</Text>
						),
					}}
				/>
			))}
		</Tab.Navigator>
	);
};

export default Main;
