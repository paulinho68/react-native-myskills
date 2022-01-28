import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    GestureResponderEvent
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
    skill: string;
    onExclude: () => void;
}

export default function SkillCard({ skill, onExclude, ...rest }: SkillCardProps) {
    const [exclude, setExclude] = useState(false);

    const handleExclude = () => {
        if (exclude) {
            onExclude();
        } else {
            setExclude(!exclude);
        }
    }

    return (
        <TouchableOpacity style={[styles.buttonSkill, { backgroundColor: exclude ? 'red' : '#1F1E25' }]} onPress={handleExclude} {...rest}>
            <Text style={styles.textSkill}>
                {exclude ? 'Click again to confirm.' : skill}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1F1E25',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10
    },
    textSkill: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold'
    }
})