import {StyleSheet} from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import {NavigationProp} from '@react-navigation/native';

// Recibe un objeto de navegación
type ScreenProps = {
	navigation: NavigationProp<any>;
};

const Screen = ({navigation}: ScreenProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Calculadora</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 64,
		fontWeight: 'bold',
	},
});

export default Screen;
