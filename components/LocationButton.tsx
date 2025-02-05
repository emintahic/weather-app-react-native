import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LocationIcon from "@/assets/icons/LocationIcon";

interface TProps {
  setCityModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationButton = ({ setCityModalVisible }: TProps) => {
  return (
    <TouchableOpacity
      testID="location-button"
      onPress={() => setCityModalVisible(true)}
    >
      <View className=" bg-white rounded-full p-3 backdrop-opacity-85">
        <LocationIcon width={20} height={20} />
      </View>
    </TouchableOpacity>
  );
};

export default LocationButton;
