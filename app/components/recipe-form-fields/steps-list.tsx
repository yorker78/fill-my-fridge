import {Icon, IconButton, List} from "react-native-paper";
import React from "react";
import {GestureResponderEvent} from "react-native";


export const StepsList = (props: { steps: string[], setSteps: Function }) => {
    const {steps, setSteps} = props
    return (
        steps.map((step: string, index: number) => {
            return <List.Item
                title={`${index + 1}. ${step}`}
                key={index}
                right={() =>
                    <IconButton
                        icon="close"
                        size={20}
                        onPress={(e: GestureResponderEvent) => {
                            setSteps(steps.filter(filterStep => filterStep !== step));
                        }}
                    />
                }
            />
        })
    )
}