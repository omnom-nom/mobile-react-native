import { moderateScale, width, verticalScale, height } from './Scaling';
import _ from 'lodash'

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

export const style = {
    font: "System",
    subheading: moderateScale(15),
    heading: moderateScale(20),
    color: "#fbb700",
    shadow: (color = '#000', size = 1) => {
        return {
            shadowColor: color,
            shadowOffset: { width: 0, height: moderateScale(size) },
            shadowOpacity: 0.3,
            shadowRadius: moderateScale(size),
        }
    },
    backgroundColor: (opacity = 0.02) => {
        return `rgba(0, 157, 196, ${opacity})`
    },
    secondaryColor : colors.caribbreanGreen
}

export const loggerConfig = {
    level: "DEBUG"
}

export const infoAbsent = (data) => {
    return _.isUndefined(data) || _.isEmpty(data) || _.isNull(data)
}

export const numberAbsent = (number) => {
    return _.isUndefined(number) || _.isNull(number) || _.isNaN(number)
}