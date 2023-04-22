import TrackPlayer, {
	Capability,
	AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import {useEffect, useState} from 'react';
import {Colors} from 'react-native-ui-lib';
import {ToastAndroid, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Main from './src/Main';

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
			<NavigationContainer>
				<Main />
			</NavigationContainer>
		</>
	);
};

export default App;
