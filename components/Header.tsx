import { View, Text } from "react-native";
import React from "react";
import LocationButton from "./LocationButton";

const Header = ({
  weatherData,
  setCityModalVisible,
}: {
  weatherData: IWeather | undefined;
  setCityModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const timezoneOffset = weatherData?.timezone ?? 0;
  const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
  const currentHour = `${localTime
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${localTime
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <View className="w-full relative">
      <Text testID="current-time" className="text-white text-2xl">
        {currentHour}
      </Text>
      <View className="absolute top-2 right-1">
        <LocationButton setCityModalVisible={setCityModalVisible} />
      </View>
      <View className="self-start">
        <Text
          testID="location-name"
          className="text-white text-6xl font-light my-1.5 "
        >
          {weatherData?.name ?? "Unknown Location"}
        </Text>
        <View
          testID="separator-line"
          className="h-[0.5px] bg-white w-auto rounded-full"
        ></View>
      </View>
    </View>
  );
};

export default Header;
