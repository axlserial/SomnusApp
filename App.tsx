import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ToastAndroid, StatusBar} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {useEffect, useState} from 'react';
import Main from './src/Main';
import TrackPlayer, {
	Capability,
	AppKilledPlaybackBehavior,
} from 'react-native-track-player';

const App = () => {
	// Indica si es la primera vez que se inicia la aplicación
	const [firstTime, setFirstTime] = useState(true);

	// Inicializar dependencias
	const initTrackPlayer = async () => {
		try {
			// Inicializar TrackPlayer
			if (firstTime) {
				await TrackPlayer.setupPlayer();
				await TrackPlayer.updateOptions({
					android: {
						appKilledPlaybackBehavior:
							AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
					},

					// Capacidad de la notificación
					capabilities: [Capability.Play, Capability.Pause],

					// Notificación compacta
					compactCapabilities: [Capability.Play, Capability.Pause],
				});

				setFirstTime(false);
			}
		} catch (error) {
			ToastAndroid.show(
				'Error al iniciar dependencias de la aplicación',
				ToastAndroid.SHORT,
			);
		} finally {
			// Ocultar SplashScreen
			SplashScreen.hide();
		}
	};

	useEffect(() => {
		initTrackPlayer();
	}, []);

	return (
		<>
			<StatusBar backgroundColor={Colors.background} />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<Main />
				</NavigationContainer>
			</GestureHandlerRootView>
		</>
	);
};

export default App;
