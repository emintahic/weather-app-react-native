import EarthIcon from "@/assets/icons/cities/EarthIcon";
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

interface City {
  name: string;
  isLocation?: boolean;
  icon: React.JSX.Element;
  lat: number;
  lon: number;
}

interface CitySelectModalProps {
  setCityModalVisible: (visible: boolean) => void;
  cityModalVisible: boolean;
  DEFAULT_CITIES: City[];
  handleCitySelection: (city: City) => void;
  handleUseCurrentLocation: () => void;
}

const { width } = Dimensions.get("window");

const CitySelectModal: React.FC<CitySelectModalProps> = ({
  setCityModalVisible,
  cityModalVisible,
  DEFAULT_CITIES,
  handleCitySelection,
  handleUseCurrentLocation,
}) => {
  const citiesWithLocation = [
    ...DEFAULT_CITIES,
    {
      name: "My Location",
      isLocation: true,
      icon: <EarthIcon width={32} height={32} />,
      lat: 0,
      lon: 0,
    },
  ];

  return (
    <Modal visible={cityModalVisible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/30 bg-opacity-50 p-4">
        <View className="w-full bg-white rounded-lg p-6 shadow-md">
          <Text className="text-xl font-semibold mb-6 text-gray-800 text-center">
            Select a City
          </Text>
          <FlatList
            data={citiesWithLocation}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            renderItem={({ item }: { item: City }) => (
              <TouchableOpacity
                onPress={() =>
                  item.isLocation
                    ? handleUseCurrentLocation()
                    : handleCitySelection(item)
                }
                className="items-center justify-center rounded-xl bg-gray-100 border border-gray-300"
                style={{ width: (width - 90) / 2, height: 90 }}
                testID={`city-item-${item.name}`}
              >
                {item.icon}
                <Text className="text-base font-medium text-gray-600">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            testID="city-list"
          />
          <TouchableOpacity
            onPress={() => setCityModalVisible(false)}
            className="mt-6 w-full bg-black rounded-md p-4 items-center"
            testID="close-button"
          >
            <Text className="text-lg font-medium text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CitySelectModal;
