import React, { useEffect } from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import Screen from "./Screen";
import useApi from "../hooks/useApi";
import useRefresh from "../hooks/useRefresh";
import coursesApi from "../api/courses";
import AppText from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import SmallCard from "../components/SmallCard";
import ContentNotFound from "../components/ContentNotFound";

function CoursesScreen({ navigation }) {
  const getCoursesApi = useApi(coursesApi.getCourses);
  const refresh = useRefresh(getCoursesApi);

  useEffect(() => {
    getCoursesApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getCoursesApi.loading} />
      <Screen>
        {getCoursesApi.error && (
          <>
            <AppText>Couldn't retrieve the courses</AppText>
            <Button title="Retry" onPress={getCoursesApi.request} />
          </>
        )}
        <FlatList
          data={getCoursesApi.data}
          keyExtractor={(course) => course.id.toString()}
          onRefresh={refresh.onRefresh}
          refreshing={refresh.refreshing}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: 50,
          }}
          renderItem={({ item }) => (
            <SmallCard
              text={item.name}
              image={{ uri: item.icon }}
              onPress={() => navigation.navigate(routes.TOPICS, item)}
            />
          )}
          ListEmptyComponent={() => <ContentNotFound />}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CoursesScreen;
