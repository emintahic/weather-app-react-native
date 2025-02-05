import { View, Text, FlatList } from "react-native";
import React from "react";

const ForecastSlider = ({
  fiveDayForecast,
  weatherIcons,
}: {
  fiveDayForecast: any;
  weatherIcons: WeatherIcons;
}) => {
  return (
    <View>
      <View className="h-[0.5px] bg-white w-auto rounded-full"></View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={fiveDayForecast}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="p-4" testID="forecast-item">
            <Text className="text-sm text-white/70">
              {item.isToday
                ? "Today"
                : item.isTomorrow
                ? "Tomorrow"
                : new Date(item.dt * 1000).toLocaleDateString(undefined, {
                    weekday: "long",
                  })}
            </Text>
            <Text className="text-2xl text-white">
              {Math.round(item.main.temp)}°C
            </Text>
            <View className="flex-row justify-center items-center gap-1">
              {weatherIcons[item.weather[0].main as keyof WeatherIcons]}
              <Text className="text-sm capitalize text-white">
                {item.weather[0].main}
              </Text>
            </View>
          </View>
        )}
      />
      <View className="h-[0.5px] bg-white w-auto rounded-full"></View>
    </View>
  );
};

export default ForecastSlider;
