import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path, Circle } from 'react-native-svg';

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ firstname: '', lastname: '', username: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const animation = useRef(new Animated.Value(0)).current; // Animation value for profile icon

  // Animation setup for profile-pop effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -2, // Move up 2px
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0, // Return to original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const userToFetch = username || (await AsyncStorage.getItem('username'));
      console.log('Profile component trying to fetch for username:', userToFetch); // Debug

      if (!userToFetch || typeof userToFetch !== 'string') {
        setError('No valid username found to fetch profile.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://envprj.onrender.com/api/user?username=${encodeURIComponent(userToFetch)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response for profile:', result); // Debug

        if (result.message === 'NotFound') {
          setError('User not found.');
          setUserData({ firstname: '', lastname: '', username: '' });
          return;
        }

        if (!result.data) {
          throw new Error('No user data returned from API.');
        }

        const { firstname, lastname, username: fetchedUsername } = result.data;
        setUserData({
          firstname: firstname || 'N/A',
          lastname: lastname || 'N/A',
          username: fetchedUsername || userToFetch || 'N/A',
        });
      } catch (error) {
        setError('Failed to fetch user profile. Please check connection and try again.');
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Decorative Background Elements */}
        <View style={[styles.decorTop, { transform: [{ skewY: '-5deg' }] }]} />
        <View style={[styles.decorBottom, { transform: [{ skewY: '-5deg' }] }]} />

        {/* Profile Title */}
        <View style={styles.titleContainer}>
          <Animated.View style={{ transform: [{ translateY: animation }] }}>
            <Svg width={36} height={36} viewBox="0 0 24 24" fill="#4caf50">
              <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </Svg>
          </Animated.View>
          <Text style={styles.title}>Your Profile</Text>
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4caf50" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!isLoading && !error && (
          <View style={styles.profileDetails}>
            <View style={styles.profileField}>
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.value}>{userData.firstname}</Text>
            </View>
            <View style={styles.profileField}>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.value}>{userData.lastname}</Text>
            </View>
            <View style={styles.profileField}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{userData.username}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f7', // Mimics bg-gradient-to-br from-[#e0f2f7] to-[#b2ebf2]
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF', // bg-white
    padding: 40, // p-10
    borderRadius: 16, // rounded-2xl
    shadowColor: '#000', // shadow-xl
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1, // border
    borderColor: '#dcdcdc', // border-[#dcdcdc]
    width: '100%',
    maxWidth: 400, // max-w-md
    overflow: 'hidden',
  },
  decorTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '25%', // h-1/4
    backgroundColor: '#4caf50', // bg-[#4caf50]
    opacity: 0.8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '25%', // h-1/4
    backgroundColor: '#90a4ae', // bg-[#90a4ae]
    opacity: 0.8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16, // mt-4
    marginBottom: 16, // mb-4
    zIndex: 10,
  },
  title: {
    fontSize: 24, // text-3xl
    fontWeight: '800', // font-extrabold
    color: '#2e7d32', // text-[#2e7d32]
    marginLeft: 12, // gap-3
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    zIndex: 10,
  },
  loadingText: {
    fontSize: 18, // text-lg
    color: '#4B5563', // text-gray-600
    marginLeft: 8, // gap-2
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626', // text-red-600
    fontWeight: '500', // font-medium
    textAlign: 'center',
    marginVertical: 8,
    zIndex: 10,
  },
  profileDetails: {
    zIndex: 10,
  },
  profileField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, // mb-3
    paddingBottom: 8, // pb-2
    borderBottomWidth: 1, // border-b
    borderStyle: 'dashed', // border-dashed
    borderColor: '#c8e6c9', // border-[#c8e6c9]
  },
  label: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    color: '#2e7d32', // text-[#2e7d32]
  },
  value: {
    fontSize: 18, // text-lg
    color: '#1F2937', // text-gray-800
  },
});

export default Profile;