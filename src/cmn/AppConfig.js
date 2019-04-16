import { moderateScale, width, verticalScale, height } from './Scaling';

export const style = {
    font: "Futura",
    subheading: moderateScale(15),
    heading: moderateScale(20),
    color: "#fbb700",
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: moderateScale(2) },
        shadowOpacity: 0.3,
        shadowRadius: moderateScale(2),
    }
}

export const loggerConfig = {
    level: "DEBUG"
}

//https://www.w3schools.com/colors/colors_crayola.asp
export const colors = {
    green: '#3AA655',
    shamrock: '#33CC99',
    mountainMedow: '#1AB385',
    jungleGreen: '#29AB87',
    caribbreanGreen: '#00CC99',
    tropicakRainForest: '#00755E',
    pineGreen: '#01786F',
    maximumBlueGreen: '#30BFBF',
    robinsEggBlue: '#00CCCC',
    tealBlue: '#008080',
    scarlet: '#FD0E35',
    mahogany: '#CA3435',
    razzmatazz: '#E30B5C',
    radicalRed: '#FF355E',
    outrageousOrange: '#FF6037',
    eerieBlack: '#1B1B1B',
    blackshows: '#BFAFB2'
}