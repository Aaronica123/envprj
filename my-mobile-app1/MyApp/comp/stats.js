import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DataSummary = () => {
  const [data, setData] = useState({
    phone: 0,
    laptop: 0,
    printer: 0,
    message: '',
  });
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  let refreshInterval = null; // Declare refreshInterval with 'let' for reassignment
  const navigation = useNavigation(); // Hook for navigation

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://envprj.onrender.com/api/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData({
          phone: result.phone || 0,
          laptop: result.laptop || 0,
          printer: result.printer || 0,
          message: result.message || '',
        });
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Failed to fetch data: ${errorText || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Network error or server unavailable. Failed to fetch data.');
    }
  };

  // Effect hook to fetch data on component mount and handle auto-refresh
  useEffect(() => {
    fetchData(); // Fetch data initially when component mounts

    if (isRefreshing) {
      refreshInterval = setInterval(fetchData, 3000); // Refresh every 3 seconds
    }

    // Cleanup function to clear the interval
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isRefreshing]);

  // Handler to toggle auto-refresh
  const handleRefreshToggle = () => {
    setIsRefreshing((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Component Title */}
        <Text style={styles.title}>E-Waste Collection Summary</Text>

        {/* Refresh Button */}
        <TouchableOpacity
          style={[
            styles.button,
            isRefreshing ? styles.buttonRed : styles.buttonGreen,
          ]}
          onPress={handleRefreshToggle}
        >
          <Text style={styles.buttonText}>
            {isRefreshing ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
          </Text>
        </TouchableOpacity>

        {/* Error Display */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.dataContainer}>
            {/* Data Display */}
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Phones:</Text>
              <Text style={styles.dataValue}>{data.phone} kg</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Laptops:</Text>
              <Text style={styles.dataValue}>{data.laptop} kg</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Printers:</Text>
              <Text style={styles.dataValue}>{data.printer} kg</Text>
            </View>
            {data.message && (
              <Text style={styles.messageText}>
                <Text style={styles.messageLabel}>Message from Server:</Text>{' '}
                {data.message}
              </Text>
            )}
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={() => navigation.navigate('DataForm')} // Assuming /stats maps to DataForm
          >
            <Text style={styles.buttonText}>Submit More Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.navigate('NavBar')} // Assuming /navbar maps to NavBar
          >
            <Text style={styles.buttonText}>Back to Navigation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-50
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF', // bg-white
    borderRadius: 12, // rounded-xl
    padding: 24, // p-8
    borderWidth: 1, // border
    borderColor: '#D1FAE5', // border-green-200
    shadowColor: '#000', // shadow-xl
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    maxWidth: 400, // max-w-md
    width: '100%',
  },
  title: {
    fontSize: 24, // text-3xl
    fontWeight: 'bold',
    color: '#15803D', // text-green-700
    marginBottom: 24, // mb-6
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12, // py-3
    paddingHorizontal: 16, // px-4
    borderRadius: 8, // rounded-lg
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // shadow-md
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 24, // mb-6
  },
  buttonGreen: {
    backgroundColor: '#16A34A', // bg-green-600
  },
  buttonRed: {
    backgroundColor: '#EF4444', // bg-red-500
  },
  buttonText: {
    color: '#FFFFFF', // text-white
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#DC2626', // text-red-600
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  dataContainer: {
    marginTop: 16, // space-y-4 (gap between items)
  },
  dataItem: {
    backgroundColor: '#F0FDF4', // bg-green-50
    padding: 16, // p-4
    borderRadius: 8, // rounded-lg
    flexDirection: 'row', // flex justify-between
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // space-y-4
    shadowColor: '#000', // shadow-sm
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dataLabel: {
    fontSize: 18, // text-lg
    color: '#1F6A44', // text-green-800
    fontWeight: '600', // font-semibold
  },
  dataValue: {
    fontSize: 18, // text-lg
    color: '#16A34A', // text-green-600
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    color: '#4B5563', // text-gray-600
    textAlign: 'center',
    marginTop: 16, // mt-4
  },
  messageLabel: {
    fontWeight: '600', // font-semibold
  },
  navContainer: {
    flexDirection: 'row', // flex justify-between
    justifyContent: 'space-between',
    marginTop: 24, // mt-6
  },
  submitButton: {
    backgroundColor: '#3B82F6', // bg-blue-500
    flex: 1, // w-1/2
    marginRight: 8, // space-x-4
  },
  backButton: {
    backgroundColor: '#9CA3AF', // bg-gray-400
    flex: 1, // w-1/2
    marginLeft: 8, // space-x-4
  },
});

export default DataSummary;