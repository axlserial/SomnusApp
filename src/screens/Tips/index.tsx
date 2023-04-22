import Screen from './screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TipsStack = createNativeStackNavigator();

const TipsScreen = () => {
	return (
		<TipsStack.Navigator initialRouteName="Tips">
			<TipsStack.Screen
				name="Tips"
				component={Screen}
				options={{headerShown: false}}
			/>
		</TipsStack.Navigator>
	);
};

export default TipsScreen;
