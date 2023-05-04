import Screen from './screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native-ui-lib';

const AudioStack = createNativeStackNavigator();
import MusicRelax from './musicRelax';
import CuentosShort from './CuentosShort';
import MusicNature from './MusicNature';
import Reproductor from './reproductor';

const AudioScreen = () => {
	return (
		<AudioStack.Navigator
			initialRouteName="Audios"
			screenOptions={{animation: 'slide_from_right'}}>
			<AudioStack.Screen
				name="Audios"
				component={Screen}
				options={{headerShown: false}}
			/>
			<AudioStack.Screen
				name="MusicRelax"
				component={MusicRelax}
				options={{
					title: 'Music Relax',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
			<AudioStack.Screen
				name="MusicNature"
				component={MusicNature}
				options={{
					title: 'Music Relax',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
			<AudioStack.Screen
				name="CuentosShort"
				component={CuentosShort}
				options={{
					title: 'Music Relax',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
			<AudioStack.Screen
				name="Reproductor"
				component={Reproductor}
				options={{
					title: 'Reproductor',
					headerTintColor: Colors.white,
					headerStyle: {
						backgroundColor: Colors.background,
					},
				}}
			/>
		</AudioStack.Navigator>
	);
};

export default AudioScreen;
