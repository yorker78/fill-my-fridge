import { Dropdown } from "react-native-paper-dropdown";
import {StyleSheet, View} from "react-native";
import { useState } from "react";

const OPTIONS = [
    { label: 'Bake', value: 'bake' },
    { label: 'Boil', value: 'boil' },
    { label: 'Braise', value: 'braise' },
    { label: 'Broil', value: 'broil' },
    { label: 'Fry', value: 'fry' },
    { label: 'Grill', value: 'grill' },
    { label: 'Microwave', value: 'microwave' },
    { label: 'Poach', value: 'poach' },
    { label: 'Pressure Cook', value: 'pressure' },
    { label: 'Saute', value: 'saute' },
    { label: 'Sear', value: 'sear' },
    { label: 'Smoke', value: 'smoke' },
    { label: 'Roast', value: 'roast' },
    { label: 'Wok', value: 'wok' }
];

export const MethodField = ({ method, setMethod }) => {
    return (
        <View style={styles.rowItem}>
            <Dropdown
                label="Cooking Method"
                placeholder="Select Method"
                options={OPTIONS}
                value={method}
                onSelect={setMethod}
                menuContentStyle={{
                    backgroundColor: "#f8f8f8",
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        marginRight: 2
    },
})