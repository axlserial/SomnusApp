/**
 * Este archivo se encarga de configurar los colores de la aplicación.
 */

import {Colors, ThemeManager} from 'react-native-ui-lib';

// Colores de la aplicación
const colors = {
	background: '#030D2A',
	text: '#BFE9FF',
};

// Esquema de colores
const colorScheme = {
	screenBG: colors.background,
	textColor: colors.text,
};

// Cargo los colores y el esquema de colores
Colors.loadColors(colors);
Colors.loadSchemes({
	light: colorScheme,
	dark: colorScheme,
});

// Configuración los colores de los componentes
ThemeManager.setComponentTheme('View', {
	backgroundColor: Colors.screenBG,
});

ThemeManager.setComponentTheme('Text', {
	color: Colors.textColor,
});
