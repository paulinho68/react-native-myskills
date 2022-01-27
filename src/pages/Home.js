import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native';
import Button from '../components/Button';
import SkillCard from '../components/SkillCard';

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);
    const [greeting, setGreeting] = useState('');
    const handleNewAddSkill = () => {
        setMySkills(oldState => [...oldState, newSkill]);
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good night');
        }
    }, [greeting])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Paulo</Text>
            <Text style={styles.greetings}>
                {greeting}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='New skill'
                placeholderTextColor='#999'
                onChangeText={setNewSkill}
            />

            <Button onPress={handleNewAddSkill} />


            <Text style={[styles.title, { marginVertical: 50 }]}>
                My skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item + Math.random()}
                renderItem={({ item }) => (
                    <SkillCard skill={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1e24',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
    greetings: {
        color: '#FFF'
    }
})