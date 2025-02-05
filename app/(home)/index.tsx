import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import CitySelectModal from "@/components/CitySelectModal";
import WeatherConditionHeader from "@/components/WeatherConditionHeader";
import WindCard from "@/components/WindCard";
import HumidityCard from "@/components/HumidityCard";
import SunIcon from "@/assets/icons/weatherIcons/SunIcon";
import CloudIcon from "@/assets/icons/weatherIcons/CloudIcon";
import RainIcon from "@/assets/icons/weatherIcons/RainIcon";
import StormIcon from "@/assets/icons/weatherIcons/StormIcon";
import SnowIcon from "@/assets/icons/weatherIcons/SnowIcon";
import ArrowUpIcon from "@/assets/icons/weatherIcons/ArrowUpIcon";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import RealFeelComponent from "@/components/RealFeelComponent";
import DetailsComponents from "@/components/DetailsComponents";
import { DEFAULT_CITIES } from "@/assets/mock/DEFAULT_CITIES";
import ForecastSlider from "@/components/ForecastSlider";

const WEATHER_API_KEY = "ab125b5aad7bd8a982d067f82fa5fa17";
const UNSPLASH_ACCESS_KEY = "fjm7bPIzfPslfxU5UpFNPsoopaBeRiuoaDB3GLKNOD4";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [fiveDayForecast, setFiveDayForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cityModalVisible, setCityModalVisible] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const groupedForecast = response.data.list.reduce(
        (acc: Record<string, any[]>, item: any) => {
          const date = new Date(item.dt * 1000).toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        },
        {}
      );

      const fiveDayData = Object.keys(groupedForecast)
        .slice(0, 5)
        .map((date, index) => {
          const dayForecast = groupedForecast[date];
          const midIndex = Math.floor(dayForecast.length / 2);
          return {
            ...dayForecast[midIndex],
            isToday: index === 0,
            isTomorrow: index === 1,
          };
        });

      setFiveDayForecast(fiveDayData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const fetchBackgroundImage = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          cityName
        )}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`
      );

      if (response.data.results.length > 0) {
        setBackgroundImage(response.data.results[0].urls.regular);
      } else {
        setBackgroundImage("");
      }
    } catch (error) {
      console.error("Error fetching background image:", error);
      setBackgroundImage("");
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission not granted");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    fetchWeatherData(latitude, longitude);
    fetchForecastData(latitude, longitude);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (weatherData?.name) {
      fetchBackgroundImage(weatherData.name);
    }
  }, [weatherData]);

  const handleCitySelection = (city: {
    name: string;
    isLocation?: boolean;
    icon: React.JSX.Element;
    lat: number;
    lon: number;
  }) => {
    setCityModalVisible(false);
    fetchWeatherData(city.lat, city.lon);
    fetchForecastData(city.lat, city.lon);
  };

  const handleUseCurrentLocation = () => {
    fetchLocation();
    setCityModalVisible(false);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGradientColors = () => {
    if (!weatherData) return ["#D0D0D0", "#A0A0A0"];

    const timezoneOffset = weatherData.timezone;
    const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
    const currentHour = localTime.getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    const condition = weatherData.weather[0].main.toLowerCase();

    const bottomColor = isDayTime ? "#b0b8c1" : "#3a3f47";

    switch (condition) {
      case "clear":
        return isDayTime ? ["#65afff", bottomColor] : ["#1E3A5F", bottomColor];
      case "clouds":
        return isDayTime ? ["#83b5c9", "#c7beb8"] : ["#4b6383", bottomColor];
      case "rain":
        return isDayTime ? ["#628c97", bottomColor] : ["#2c4c50", bottomColor];
      case "snow":
        return isDayTime ? ["#b6def0", bottomColor] : ["#b6def0", bottomColor];
      case "thunderstorm":
        return isDayTime ? ["#5B6D75", bottomColor] : ["#232B33", bottomColor];
      case "drizzle":
        return isDayTime ? ["#4b6383", bottomColor] : ["#32455e", bottomColor];
      default:
        return isDayTime ? ["#4b6383", bottomColor] : ["#1E3A5F", bottomColor];
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-lg text-white">Loading weather data...</Text>
      </View>
    );
  }

  const timezoneOffset = weatherData?.timezone ?? 0;
  const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
  const localDayString = localTime.toLocaleDateString(undefined, {
    weekday: "long",
  });
  const localDateString = localTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const weatherIcons = {
    Clear: <SunIcon width={14} height={14} />,
    Clouds: <CloudIcon width={14} height={14} />,
    Rain: <RainIcon width={14} height={14} />,
    Drizzle: <RainIcon width={14} height={14} />,
    Thunderstorm: <StormIcon width={14} height={14} />,
    Snow: <SnowIcon width={14} height={14} />,
  };

  return (
    <LinearGradient colors={getGradientColors()} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 ">
        <View testID="home-screen" className="flex-1 p-4">
          {/* Header section */}
          <Header
            weatherData={weatherData}
            setCityModalVisible={setCityModalVisible}
          />
          <ScrollView
            className="flex-1 scroll-smooth"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row mt-2">
              <Text className="text-xl text-gray-200 mr-1.5">
                {localDayString}
              </Text>
              <Text className="text-xl text-white">{localDateString}</Text>
            </View>
            {/* Hero section */}
            <View className=" flex-row">
              <Text className="text-[100px] mt-3 text-white">
                {weatherData && Math.round(weatherData.main.temp)}°
              </Text>
              <View className="justify-end pb-7">
                <WeatherConditionHeader weatherData={weatherData} />
              </View>
            </View>
            <View className="flex-row justify-between">
              <View>
                {weatherData &&
                  weatherData.weather[0].description
                    .split(" ")
                    .map((word, index) => (
                      <Text
                        key={index}
                        className="capitalize text-white text-6xl max-w-60 font-light"
                      >
                        {word}
                      </Text>
                    ))}
              </View>
              <View className="justify-end items-end gap-5">
                <WindCard weatherData={weatherData} />
                <HumidityCard weatherData={weatherData} />
              </View>
            </View>

            {/* Sliding Forecast section */}
            <ForecastSlider
              fiveDayForecast={fiveDayForecast}
              weatherIcons={weatherIcons}
            />

            {/* City Image */}
            <View className="my-5 bg-white/15 rounded-[36px] pt-2">
              <View className=" bg-white/25 rounded-[36px] pt-2  ">
                <View>
                  {backgroundImage ? (
                    <View className="h-56 w-full rounded-[36px] overflow-hidden">
                      <Image
                        source={{ uri: backgroundImage }}
                        className="flex-1"
                      />
                    </View>
                  ) : (
                    <View className="h-56 w-full rounded-[36px] justify-center items-center bg-gray-200 ">
                      <Text>No image available</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {/* Rest of the content */}
            <View className="flex-row justify-between items-center">
              <View className="items-center justify-center gap-0.5 flex-row">
                <Text className="text-3xl font-light text-white">Sunrise</Text>
                <ArrowUpIcon width={18} height={18} />
              </View>
              <View className="items-center justify-center gap-0.5 flex-row">
                <ArrowDownIcon width={18} height={18} />
                <Text className="text-3xl font-light text-white">Sunset</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center justify-center">
                <Text className="text-4xl font-light text-white">
                  {weatherData && formatTime(weatherData.sys.sunrise)}
                </Text>
                <Text className="text-4xl font-light text-white/50">h</Text>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-4xl font-light text-white">
                  {weatherData && formatTime(weatherData.sys.sunset)}
                </Text>
                <Text className="text-4xl font-light text-white/50">h</Text>
              </View>
            </View>

            <RealFeelComponent weatherData={weatherData} />
            <DetailsComponents weatherData={weatherData} />
          </ScrollView>
        </View>

        {/* City Selection Modal */}

        <CitySelectModal
          DEFAULT_CITIES={DEFAULT_CITIES}
          cityModalVisible={cityModalVisible}
          handleCitySelection={handleCitySelection}
          handleUseCurrentLocation={handleUseCurrentLocation}
          setCityModalVisible={setCityModalVisible}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
