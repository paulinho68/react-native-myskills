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

interface MySkillsProps {
    id: string,
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<MySkillsProps[]>([]);
    const [greeting, setGreeting] = useState('');
    const [dateTime, setDateTime] = useState(new Date().toLocaleString('pt-br'));

    setTimeout(() => setDateTime(new Date().toLocaleString('pt-br')), 1000);

    const handleNewAddSkill = () => {
        if (newSkill) {
            const data = {
                id: String(new Date().getTime()),
                name: newSkill
            }
            setMySkills(oldState => [data, ...oldState]);
        }
    }

    const handleRemoveSkill = (id: string) => {
        setMySkills(oldState => oldState.filter(skill => skill.id !== id))
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
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.greetings}>
                {greeting} - {dateTime}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='New skill'
                placeholderTextColor='#999'
                onChangeText={setNewSkill}
            />

            <Button onPress={handleNewAddSkill} title="Add" />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name} onExclude={() => handleRemoveSkill(item.id)} />
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