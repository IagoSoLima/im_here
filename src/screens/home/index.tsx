import { useState, useRef } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Participant from "../../components/Participant";
import { generateRandomNumbers } from "../../utils";
import { styles } from "./style";

interface participantsDate {
  id: string;
  name: string;
}

export const Home = () => {
  const [participants, setParticipants] = useState<participantsDate[]>([]);
  const [input, setInput] = useState("");

  function handleParticipantAdd(name: string) {
    let id = "0";
    let idIsAlreadyregistred = false;

    do {
      id = generateRandomNumbers().toString();
      const index = participants.findIndex(
        (participant) => participant.id === id
      );
      idIsAlreadyregistred = index >= 0;
    } while (idIsAlreadyregistred);

    const participant = { id, name };
    setParticipants((prevState) => [...prevState, { ...participant }]);
    setInput("");
    Alert.alert("adicionado com sucesso");
  }

  function handleParticipantRemove(id: string) {
    Alert.alert("Remover", "Deseja remover o participante ?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "default",
        onPress: () =>
          setParticipants(
            participants.filter(({ id: participanId }) => participanId !== id)
          ),
      },
    ]);
  }

  return (
    <>
      <StatusBar barStyle={"light-content"} translucent />
      <View style={styles.container}>
        <Text style={styles.eventName}>Nome do Evento</Text>

        <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor={"#6B6B6B"}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleParticipantAdd(input)}
          />

          <TouchableOpacity
            style={{ ...styles.button }}
            onPress={() => handleParticipantAdd(input)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ ...styles.title }}>Participantes</Text>

          <FlatList
            data={participants}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.text}>Ninguém chegou no evento ainda?</Text>
                <Text style={styles.text}>
                  Adicione participantes a sua lista de presença.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Participant
                key={item.id}
                id={item.id}
                name={item.name}
                handleParticipantRemove={handleParticipantRemove}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};
