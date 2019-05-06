import { moderateScale, width, verticalScale, height } from './Scaling';
import _ from 'lodash'
import { iOSColors } from 'react-native-typography';

//https://www.w3schools.com/colors/colors_crayola.asp
export const colors = {
    alienArmpit: '#84DE02',
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
    blueIII: '#0066FF',
    midnightBlue: '#00468C',
    scarlet: '#FD0E35',
    mahogany: '#CA3435',
    razzmatazz: '#E30B5C',
    radicalRed: '#FF355E',
    outrageousOrange: '#FF6037',
    eerieBlack: '#1B1B1B',
    blackshows: '#BFAFB2'
}

const fontFamily = 'Avenir Next' //'System'
const primaryColor = iOSColors.eerieBlack
const secondaryColor = colors.caribbreanGreen

export const style = {
    font: fontFamily,
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
    fontStyle: (args) => {
        args = args || {};
        size  = args.size || 13
        return {
            fontFamily : args.fontFamily || fontFamily,
            fontWeight : args.fontWeight || 'normal',
            color: args.color || primaryColor,
            fontSize: moderateScale(size),
        }
    },
    secondaryColor
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