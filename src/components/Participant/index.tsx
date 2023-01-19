import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

interface Props {
  id: string;
  name: string;
  handleParticipantRemove: (id: string) => void;
}

function Participant({ id, name, handleParticipantRemove }: Props) {
  return (
    <View style={styles.participantContainer}>
      <Text style={styles.participantName}>{name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleParticipantRemove(id)}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Participant;
