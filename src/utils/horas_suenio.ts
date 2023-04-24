// Función que retorna las 6 posibles horas para despertarse, según la hora de dormir
// que se ingresó como parámetro 

export function horas_despertar(hora: number, minutos: number, am_pm: string): string[] {
	let horas: string[] = [];

	// Si es AM, se le suma 24 para convertirlo a 24 horas
    hora = am_pm == "PM" ? hora+=12 : hora+=24

    // Declaramo un objeto Date con la hora de dormir
    let tiempo = new Date();
    tiempo.setHours(hora);
    tiempo.setMinutes(minutos);

    // Sumamos 90 minutos a el objeto Date
    tiempo.setMinutes(tiempo.getMinutes() + 90);

    // Agregamos las 6 posibles horas para despertarse al arreglo
    for (let i = 0; i < 6; i++) {
        let h_12 = tiempo.getHours() > 12 ? tiempo.getHours() - 12 : tiempo.getHours();
        if (h_12 == 0) h_12 = 12;
        let h = h_12 < 10 ? "0" + h_12 : h_12;
        let m = tiempo.getMinutes() < 10 ? "0" + tiempo.getMinutes() : tiempo.getMinutes();

        horas.push(h + ":" + m+ " " + (tiempo.getHours() >= 12 ? "PM" : "AM"));
        
        tiempo.setMinutes(tiempo.getMinutes() + 90);
    }

    // Invertimos el arreglo 

    horas = horas.reverse();

	return horas;
}
