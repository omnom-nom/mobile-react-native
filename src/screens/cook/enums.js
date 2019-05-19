import React, { Component } from 'react';
import { iOSColors } from "react-native-typography";
import _ from 'lodash'
import { Icon } from 'react-native-elements';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';

export const DishOrderTypeEnum = {
    ON_DEMAND: "OnDemand",
    PRE_ORDER: "PreOrder",
};

export const SpiceLevelTypeEnum = {
    MILD: "MILD",
    MEDIUM: "MEDIUM",
    SPICY: "SPICY"
};

export const spiceColor = (type) => {
    switch (type) {
        case SpiceLevelTypeEnum.MILD:
            return iOSColors.green
        case SpiceLevelTypeEnum.MEDIUM:
            return iOSColors.orange
        case SpiceLevelTypeEnum.SPICY:
            return iOSColors.red
        default:
            return iOSColors.black
    }
}

export const spiceDisplayName = (type) => {
    switch (type) {
        case SpiceLevelTypeEnum.MILD:
            return 'Mild Spicy'
        case SpiceLevelTypeEnum.MEDIUM:
            return 'Medium Spicy'
        case SpiceLevelTypeEnum.SPICY:
            return 'Spicy'
        default:
            return iOSColors.black
    }
}

export const spiceImage = (type, size = 15) => {
    switch (type) {
        case SpiceLevelTypeEnum.MILD:
            return spiceIcon(type, 'chili-mild', size)
        case SpiceLevelTypeEnum.MEDIUM:
            return spiceIcon(type, 'chili-medium', size)
        case SpiceLevelTypeEnum.SPICY:
            return spiceIcon(type, 'chili-hot', size)
        default:
            return null
    }
}

spiceIcon = (type, name, size) => {
    return (
        <Icon
            name={name}
            type="material-community"
            size={moderateScale(size)}
            color={spiceColor(type)}
        />
    )
}

export const FoodTypeEnum = {
    VEGETARIAN: 'vegetarian',
    NON_VEGETARIAN: 'non-vegetarian'
}

export const foodColor = (type) => {
    switch (type) {
        case FoodTypeEnum.VEGETARIAN:
            return iOSColors.green
        case FoodTypeEnum.NON_VEGETARIAN:
            return iOSColors.red
        default:
            return iOSColors.black
    }
}