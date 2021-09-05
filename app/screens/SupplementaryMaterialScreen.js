import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Linking, Button } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import ListItem from "../components/lists/ListItem";

import useApi from "../hooks/useApi";

import Screen from "./Screen";
import materials from "../api/materials";

const link =
  "http://localhost:8000/mediafiles/files/2021/09/05/Crear_un_Informe_Personalizado_de_Familias_Parte-Miembro_en_FRLS.pdf";

function SupplementaryMaterialScreen({ route, navigation }) {
  const topic = route.params;
  const getMaterialsApi = useApi(materials.getMaterials);

  useEffect(() => {
    getMaterialsApi.request(topic.id);
  }, []);

  console.log(getMaterialsApi.data);

  return (
    <Screen>
      <ActivityIndicator visible={getMaterialsApi.loading} />
      {getMaterialsApi.error && (
        <>
          <AppText>Couldn't retrieve Materials</AppText>
          <Button
            title="Retry"
            onPress={() => getMaterialsApi.request(topic.id)}
          />
        </>
      )}
      <FlatList
        data={getMaterialsApi.data}
        keyExtractor={(material) => material.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            icon="open-in-new"
            text={item.name}
            onPress={() => Linking.openURL(item.file)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SupplementaryMaterialScreen;
