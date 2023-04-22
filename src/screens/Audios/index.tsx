import Screen from './screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AudioStack = createNativeStackNavigator();

const AudioScreen = () => {
	return (
		<AudioStack.Navigator initialRouteName="Audios">
			<AudioStack.Screen
				name="Audios"
				component={Screen}
				options={{headerShown: false}}
			/>
		</AudioStack.Navigator>
	);
};

export default AudioScreen;
