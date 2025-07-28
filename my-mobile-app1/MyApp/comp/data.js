import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const DataForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    type: '',
  });
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!formData.type) {
      setMessage('Please select an e-waste type.');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    try {
      const response = await fetch('https://envprj.onrender.com/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Data submitted successfully!');
        setFormData({ amount: '', type: '' });
      } else {
        const errorData = await response.json();
        setMessage(`Submission failed: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error during data submission:', error);
      setMessage('An unexpected error occurred during submission.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Submit E-Waste Data</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount (in kg):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(value) => handleChange('amount', value)}
            placeholder="e.g., 5.0"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-Waste Type:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.type}
              onValueChange={(value) => handleChange('type', value)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Type --" value="" />
              <Picker.Item label="Phones" value="phone" />
              <Picker.Item label="Laptops" value="laptop" />
              <Picker.Item label="Printers" value="printer" />
              <Picker.Item label="Monitors" value="monitor" />
              <Picker.Item label="Televisions" value="tv" />
              <Picker.Item label="Batteries" value="battery" />
              <Picker.Item label="Other Electronics" value="other" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Data</Text>
        </TouchableOpacity>

        {message ? (
          <Text
            style={[
              styles.message,
              message.includes('successfully') ? styles.successMessage : styles.errorMessage,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.buttonText}>View Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.backButton]}
            onPress={() => navigation.navigate('NavBar')}
          >
            <Text style={styles.buttonText}>Back to Navigation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#86EFAC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803D',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    color: '#1F2937',
  },
  submitButton: {
    backgroundColor: '#16A34A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#9CA3AF',
    marginLeft: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  successMessage: {
    color: '#16A34A',
  },
  errorMessage: {
    color: '#DC2626',
  },
  navigationContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
});

export default DataForm;